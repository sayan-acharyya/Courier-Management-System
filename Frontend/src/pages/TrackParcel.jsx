import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import TrackingTimeline from "@/components/TrackingTimeline";
import { useDispatch, useSelector } from "react-redux";
//import { trackParcelThunk } from "@/features/parcels/parcelSlice";

const statusColors = {
  arrived: "bg-muted text-muted-foreground",
  in_transit: "bg-primary/10 text-primary",
  out_for_delivery: "bg-accent/10 text-accent",
  delivered: "bg-green-100 text-green-700",
};

const TrackParcel = () => {
  return <></>;
};

export default TrackParcel;
