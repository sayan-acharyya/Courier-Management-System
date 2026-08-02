import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { ArrowLeft, User, MapPin, Truck, PackageCheck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { addCheckpointThunk, fetchParcelsThunk } from "@/features/parcels/parcelSlice";

const getParcelStatus = (parcel) => {
  const checkpoints = parcel?.checkpoints || [];
  if (!checkpoints.length) return "arrived";
  return checkpoints[checkpoints.length - 1].status || "arrived";
};

export default function ParcelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading, updateLoading } = useSelector((state) => state.parcels);

  // Fetch parcels if user refreshes the page directly on this route
  useEffect(() => {
    if ((!items || items.length === 0) && !loading) {
      dispatch(fetchParcelsThunk({ page: 1, limit: 50 }));
    }
  }, [dispatch, items, loading]);

  const parcel = useMemo(() => {
    return items?.find((p) => p._id === id || p.trackingId === id);
  }, [items, id]);

  const [checkpoint, setCheckpoint] = useState({
    location: "",
    title: "",
    description: "",
    status: "in_transit",
  });

  const status = getParcelStatus(parcel);

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-2.5 border-b border-border/50 last:border-0 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value || "N/A"}</span>
    </div>
  );

  const addCheckpoint = async () => {
    if (!checkpoint.location || !checkpoint.title || !checkpoint.status) {
      toast.error("Please fill in location, title, and status");
      return;
    }

    const res = await dispatch(addCheckpointThunk({ id: parcel._id, checkpoint }));
    if (addCheckpointThunk.fulfilled.match(res)) {
      toast.success("Checkpoint added successfully");
      setCheckpoint({
        location: "",
        title: "",
        description: "",
        status: "in_transit",
      });
    }
  };

  // Loading State
  if (loading && !parcel) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Not Found Fallback
  if (!parcel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <PackageCheck className="h-12 w-12 text-muted-foreground" />
        <div>
          <h2 className="text-lg font-semibold">Parcel Not Found</h2>
          <p className="text-sm text-muted-foreground">
            The parcel ID <span className="font-mono">{id}</span> does not exist or has not loaded.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/manage-parcels")}>
          Return to Manage Parcels
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-5xl mx-auto space-y-6 p-4 md:p-6"
    >
      {/* Page Navigation & Top Title */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/manage-parcels")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight font-mono">
              {parcel.trackingId || parcel._id}
            </h1>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Full parcel details and tracking history
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Sender Details */}
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <User className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">Sender Information</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoRow label="Name" value={parcel.senderName} />
              <InfoRow label="Phone" value={parcel.senderPhone} />
              <InfoRow label="Address" value={parcel.senderAddress} />
            </CardContent>
          </Card>

          {/* Receiver Details */}
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <User className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">Receiver Information</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoRow label="Name" value={parcel.receiverName} />
              <InfoRow label="Phone" value={parcel.receiverPhone} />
              <InfoRow label="Address" value={parcel.receiverAddress} />
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <PackageCheck className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">Shipment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoRow label="Shipment Type" value={parcel.shipmentType} />
              <InfoRow label="Delivery Type" value={parcel.deliveryType} />
              <InfoRow
                label="Category"
                value={parcel.parcelCategory?.replace(/_/g, " ")}
              />
              <InfoRow label="Weight" value={parcel.weight ? `${parcel.weight} kg` : "N/A"} />
              <InfoRow
                label="Price"
                value={`₹ ${Number(parcel.price || 0).toLocaleString("en-IN")}`}
              />
              <InfoRow
                label="Created At"
                value={
                  parcel.createdAt
                    ? new Date(parcel.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"
                }
              />
            </CardContent>
          </Card>

          {/* Add Checkpoint Form */}
          <Card className="shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Add Checkpoint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="cp-location">
                  Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cp-location"
                  placeholder="e.g. Kolkata Hub"
                  value={checkpoint.location}
                  onChange={(e) =>
                    setCheckpoint({ ...checkpoint, location: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cp-title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cp-title"
                  placeholder="e.g. Arrived at Facility"
                  value={checkpoint.title}
                  onChange={(e) =>
                    setCheckpoint({ ...checkpoint, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cp-desc">Description</Label>
                <Input
                  id="cp-desc"
                  placeholder="Optional details"
                  value={checkpoint.description}
                  onChange={(e) =>
                    setCheckpoint({ ...checkpoint, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cp-status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={checkpoint.status}
                  onValueChange={(val) =>
                    setCheckpoint({ ...checkpoint, status: val })
                  }
                >
                  <SelectTrigger id="cp-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arrived">Arrived</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">Out For Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full mt-2"
                onClick={addCheckpoint}
                disabled={updateLoading}
              >
                {updateLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {updateLoading ? "Saving Checkpoint..." : "Add Checkpoint"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Route Card */}
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <CardTitle className="text-base font-semibold">Route</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center p-3 rounded-lg bg-muted/60">
                  <p className="text-xs text-muted-foreground mb-1">Origin</p>
                  <p className="font-semibold text-sm">{parcel.originCity || "N/A"}</p>
                </div>
                <Truck className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="flex-1 text-center p-3 rounded-lg bg-muted/60">
                  <p className="text-xs text-muted-foreground mb-1">Destination</p>
                  <p className="font-semibold text-sm">{parcel.destinationCity || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline Card */}
          <Card className="shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Tracking Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <TrackingTimeline checkpoints={parcel.checkpoints || []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}