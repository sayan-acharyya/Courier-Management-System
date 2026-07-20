import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
//import { calculateCostThunk } from "@/features/parcels/parcelSlice";
import {
  getDestinationOptionsForShipmentType,
  isValidDestinationForShipmentType,
  INDIAN_CITY_OPTIONS,
} from "@/lib/locationData";

const categories = [
  { value: "document", label: "Document" },
  { value: "electronics", label: "Electronics" },
  { value: "fragile", label: "Fragile" },
  { value: "clothing", label: "Clothing" },
  { value: "food", label: "Food" },
  { value: "medicine", label: "Medicine" },
  { value: "cosmetics", label: "Cosmetics" },
  { value: "books", label: "Books" },
  { value: "small_package", label: "Small Package" },
  { value: "large_package", label: "Large Package" },
];

const CalculateCostPage = () => {
  const [form, setForm] = useState({
    originCity: "",
    destinationCity: "",
    shipmentType: "national",
    parcelCategory: "",
    weight: 1,
    deliveryType: "standard",
  });

  return <></>;
};

export default CalculateCostPage;
