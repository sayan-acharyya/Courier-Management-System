import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PackagePlus } from "lucide-react";
import { createParcelThunk } from "@/features/parcels/parcelSlice";
import { toast } from "sonner";
import {
  getDestinationOptionsForShipmentType,
  isValidDestinationForShipmentType,
  INDIAN_CITY_OPTIONS,
} from "@/lib/locationData";

const categories = [
  "document",
  "electronics",
  "fragile",
  "clothing",
  "food",
  "medicine",
  "cosmetics",
  "books",
  "small_package",
  "large_package",
];

export default function CreateParcel() {
  const [form, setForm] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    shipmentType: "national",
    originCity: "",
    destinationCity: "",
    deliveryType: "standard",
    parcelCategory: "small_package",
    weight: 1,
  });

  const dispatch = useDispatch();
  const { createLoading } = useSelector((state) => state.parcels);
  const update = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const destinationOptions = useMemo(() =>
    getDestinationOptionsForShipmentType(form.shipmentType),
    [form.shipmentType]
  )

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredMissing =
      !form.senderName.trim() ||
      !form.senderPhone.trim() ||
      !form.senderAddress.trim() ||
      !form.receiverName.trim() ||
      !form.receiverPhone.trim() ||
      !form.receiverAddress.trim() ||
      !form.originCity.trim() ||
      !form.destinationCity.trim() ||
      !form.parcelCategory.trim() ||
      !form.deliveryType.trim() ||
      !form.shipmentType.trim() ||
      !form.weight;

    if (requiredMissing) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      ...form,
      weight: Number(form.weight)
    }

    const res = await dispatch(createParcelThunk(payload));
    if (createParcelThunk.fulfilled.match(res)) {
      setForm({
        senderName: "",
        senderPhone: "",
        senderAddress: "",
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        shipmentType: "national",
        originCity: "",
        destinationCity: "",
        deliveryType: "standard",
        parcelCategory: "small_package",
        weight: 1,
      })
    }
  }
  return <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <PackagePlus className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Create New Parcels
          </h1>
          <p className="text-muted-foreground text-sm">
            Fill in the details to create a new parcel.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Sender */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Sender Information</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Sender Name <span className="text-red-500">*</span></Label>
              <Input
                value={form.senderName}
                onChange={(e) => update("senderName", e.target.value)}
                placeholder="Enter sender name"
              />
            </div>

            <div>
              <Label>Phone Number <span className="text-red-500">*</span></Label>
              <Input
                value={form.senderPhone}
                onChange={(e) => update("senderPhone", e.target.value)}
                placeholder="9876543210"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Address <span className="text-red-500">*</span></Label>
              <Input
                value={form.senderAddress}
                onChange={(e) => update("senderAddress", e.target.value)}
                placeholder="Sender Address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Receiver */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Receiver Information</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Receiver Name <span className="text-red-500">*</span></Label>
              <Input
                value={form.receiverName}
                onChange={(e) => update("receiverName", e.target.value)}
                placeholder="Receiver Name"
              />
            </div>

            <div>
              <Label>Phone Number <span className="text-red-500">*</span></Label>
              <Input
                value={form.receiverPhone}
                onChange={(e) => update("receiverPhone", e.target.value)}
                placeholder="9876543210"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Address <span className="text-red-500">*</span></Label>
              <Input
                value={form.receiverAddress}
                onChange={(e) => update("receiverAddress", e.target.value)}
                placeholder="Receiver Address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Parcel Details */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Parcel Details</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {/* Shipment Type */}
            <div>
              <Label>Shipment Type <span className="text-red-500">*</span></Label>

              <Select
                value={form.shipmentType}
                onValueChange={(value) => {
                  update("shipmentType", value);

                  if (
                    !isValidDestinationForShipmentType(
                      value,
                      form.destinationCity
                    )
                  ) {
                    update("destinationCity", "");
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="international">
                    International
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Delivery */}
            <div>
              <Label>Delivery Type <span className="text-red-500">*</span></Label>

              <Select
                value={form.deliveryType}
                onValueChange={(v) => update("deliveryType", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="overnight">Overnight</SelectItem>
                  <SelectItem value="sameDay">Same Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Origin */}
            <div>
              <Label>Origin City <span className="text-red-500">*</span></Label>

              <Select
                value={form.originCity}
                onValueChange={(v) => update("originCity", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Origin" />
                </SelectTrigger>

                <SelectContent>
                  {INDIAN_CITY_OPTIONS.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destination */}
            <div>
              <Label>Destination <span className="text-red-500">*</span></Label>

              <Select
                value={form.destinationCity}
                onValueChange={(v) => update("destinationCity", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>

                <SelectContent>
                  {destinationOptions.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label>Parcel Category <span className="text-red-500">*</span></Label>

              <Select
                value={form.parcelCategory}
                onValueChange={(v) => update("parcelCategory", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Weight */}
            <div>
              <Label>Weight (kg) <span className="text-red-500">*</span></Label>

              <Input
                type="number"
                min={1}
                step="0.5"
                value={form.weight}
                onChange={(e) => update("weight", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={createLoading}
            className="min-w-[180px]"
          >
            {createLoading ? "Creating..." : "Create Parcel"}
          </Button>
        </div>
      </form>


    </motion.div>
  </>;
}
