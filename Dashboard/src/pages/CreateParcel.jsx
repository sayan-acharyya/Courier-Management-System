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
  PAKISTANI_CITY_OPTIONS,
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

  return <></>;
}
