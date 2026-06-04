/**
 * Icon set, mapped onto lucide-react (the team convention). The keys match the
 * names used across the app.
 */
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  FileText,
  Image,
  LayoutGrid,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Quote,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

export const Icon = {
  search: Search,
  plus: Plus,
  edit: Pencil,
  trash: Trash2,
  x: X,
  menu: Menu,
  back: ArrowLeft,
  arrow: ArrowRight,
  quote: Quote,
  image: Image,
  article: FileText,
  sparkle: Sparkles,
  chevron: ChevronDown,
  check: Check,
  eye: Eye,
  eyeOff: EyeOff,
  layout: LayoutGrid,
  logout: LogOut,
  clock: Clock,
  reset: RotateCcw,
} as const;
