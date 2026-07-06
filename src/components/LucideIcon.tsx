import React from 'react';
import {
  Gem,
  Compass,
  Tag,
  BookOpen,
  Clock,
  Heart,
  Users,
  Sun,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Search,
  Menu,
  X,
  ArrowUpRight,
  Star,
  Quote,
  Calendar,
  Award,
  LucideProps
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Gem,
  Compass,
  Tag,
  BookOpen,
  Clock,
  Heart,
  Users,
  Sun,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Search,
  Menu,
  X,
  ArrowUpRight,
  Star,
  Quote,
  Calendar,
  Award
};

interface LucideIconProps extends Omit<LucideProps, 'name'> {
  name: string;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    // Fallback icon if not found
    return <Compass {...props} />;
  }
  return <IconComponent {...props} />;
};
