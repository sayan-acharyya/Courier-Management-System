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
  return <></>;
}
