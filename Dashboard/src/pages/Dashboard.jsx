import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Package, CheckCircle, Truck, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchParcelsThunk } from "@/features/parcels/parcelSlice";
import { fetchDashboardStatsThunk } from "@/features/dashboard/dashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_FILL = {
  arrived: "hsl(var(--secondary))",
  in_transit: "hsl(var(--primary))",
  out_for_delivery: "hsl(var(--info))",
  delivered: "hsl(var(--success))",
};

export default function Dashboard() {
  return <></>;
}
