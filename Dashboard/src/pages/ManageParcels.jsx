import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Eye, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  addCheckpointThunk,
  fetchParcelsThunk,
} from "@/features/parcels/parcelSlice";
import { toast } from "sonner";

const getParcelStatus = (parcel) => {
  const checkpoints = parcel?.checkpoints || [];
  if (!checkpoints.length) return "arrived";
  return checkpoints[checkpoints.length - 1].status || "arrived";
};

const ManageParcels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, meta, updateLoading } = useSelector((state) => state.parcels);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shipmentFilter, setShipmentFilter] = useState("all");
  const [page, setPage] = useState(1);

  const perPage = 10;
  const [modelParcel, setModelParcel] = useState(null);
  const [checkpoint, setCheckpoint] = useState({
    title: "",
    location: "",
    description: "",
    status: "in_transit",
  });

  useEffect(() => {
    dispatch(fetchParcelsThunk({ page, limit: perPage, search }));
  }, [dispatch, page, search, perPage]);

  const filtered = useMemo(() => {
    return (items || []).filter((p) => {
      const status = getParcelStatus(p);
      const matchStatus = statusFilter === "all" || status === statusFilter;
      const matchShipment =
        shipmentFilter === "all" || p.shipmentType === shipmentFilter;
      return matchStatus && matchShipment;
    });
  }, [items, statusFilter, shipmentFilter]);

  const openUpdateModel = (parcel) => {
    setModelParcel(parcel);
    setCheckpoint({
      location: parcel.destinationCity || "",
      title: "Status Update",
      description: "",
      status: getParcelStatus(parcel),
    });
  };

  const handleAddCheckpoint = async () => {
    if (!modelParcel) return;
    if (!checkpoint.title || !checkpoint.location || !checkpoint.status) {
      toast.error("Please fill all required fields");
      return;
    }

    const res = await dispatch(
      addCheckpointThunk({ id: modelParcel._id, checkpoint })
    );
    if (addCheckpointThunk.fulfilled.match(res)) {
      toast.success("Checkpoint added successfully");
      setModelParcel(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-7xl mx-auto p-4 md:p-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Parcels</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor, filter, and add progress checkpoints to shipments.
        </p>
      </div>

      {/* Main Card */}
      <Card className="shadow-sm border">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by tracking ID..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground hidden sm:inline-block" />

                {/* Status Filter */}
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="arrived">Arrived</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  </SelectContent>
                </Select>

                {/* Shipment Type Filter */}
                <Select
                  value={shipmentFilter}
                  onValueChange={(value) => {
                    setShipmentFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-[170px]">
                    <SelectValue placeholder="Filter by shipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Shipments</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table Area */}
          <div className="relative overflow-x-auto border-t">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold">Tracking ID</TableHead>
                  <TableHead className="font-semibold">Sender</TableHead>
                  <TableHead className="font-semibold">Recipient</TableHead>
                  <TableHead className="font-semibold">Origin City</TableHead>
                  <TableHead className="font-semibold">Destination City</TableHead>
                  <TableHead className="font-semibold">Shipment Type</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Created Date</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No parcels found matching criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((parcel) => (
                    <TableRow key={parcel._id || parcel.trackingId}>
                      <TableCell className="font-medium font-mono text-xs">
                        {parcel.trackingId || parcel._id}
                      </TableCell>
                      <TableCell>{parcel.senderName || "N/A"}</TableCell>
                      <TableCell>{parcel.receiverName || "N/A"}</TableCell>
                      <TableCell>{parcel.originCity || "N/A"}</TableCell>
                      <TableCell>{parcel.destinationCity || "N/A"}</TableCell>
                      <TableCell className="capitalize">{parcel.shipmentType || "N/A"}</TableCell>
                      <TableCell>
                        <StatusBadge status={getParcelStatus(parcel)} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {parcel.createdAt
                          ? new Date(parcel.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/parcel/${parcel._id}`)}
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => openUpdateModel(parcel)}
                          >
                            <RefreshCw className="h-3.5 w-3.5 mr-1" />
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <p className="text-xs text-muted-foreground">
              Showing page <span className="font-medium">{page}</span>
              {meta?.totalPages ? ` of ${meta.totalPages}` : ""}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || loading}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={(meta?.totalPages && page >= meta.totalPages) || loading}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Checkpoint Modal */}
      <Dialog open={!!modelParcel} onOpenChange={(open) => !open && setModelParcel(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Status Checkpoint</DialogTitle>
            <DialogDescription>
              Update tracking details for parcel:{" "}
              <span className="font-mono font-semibold text-foreground">
                {modelParcel?.trackingId || modelParcel?._id}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={checkpoint.status}
                onValueChange={(value) => setCheckpoint({ ...checkpoint, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="arrived">Arrived</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Arrived at Sort Facility"
                value={checkpoint.title}
                onChange={(e) => setCheckpoint({ ...checkpoint, title: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Chicago, IL"
                value={checkpoint.location}
                onChange={(e) => setCheckpoint({ ...checkpoint, location: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Additional notes about the package status..."
                value={checkpoint.description}
                onChange={(e) => setCheckpoint({ ...checkpoint, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModelParcel(null)}>
              Cancel
            </Button>
            <Button onClick={handleAddCheckpoint} disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Save Checkpoint"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ManageParcels;