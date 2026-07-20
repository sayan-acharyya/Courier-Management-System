import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { StatusBadge } from "@/components/StatusBadge";
import { Search } from "lucide-react";
import { trackParcelThunk } from "@/features/parcels/parcelSlice";

export default function ParcelTracking() {
  return <></>;
}
