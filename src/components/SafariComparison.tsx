import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PackageFeature {
  name: string;
  budget: boolean | string;
  classic: boolean | string;
  luxury: boolean | string;
}

const packages = {
  budget: {
    name: "Budget Safari",
    price: "$1,200",
    duration: "5 days",
    badge: null,
  },
  classic: {
    name: "Classic Safari",
    price: "$2,800",
    duration: "7 days",
    badge: "Most Popular",
  },
  luxury: {
    name: "Luxury Safari",
    price: "$6,500",
    duration: "7 days",
    badge: "Best Value",
  },
};

const features: PackageFeature[] = [
  { name: "Price per person", budget: "$1,200", classic: "$2,800", luxury: "$6,500" },
  { name: "Duration", budget: "5 days", classic: "7 days", luxury: "7 days" },
  { name: "Parks visited", budget: "2 parks", classic: "4 parks", luxury: "5 parks" },
  { name: "Accommodation", budget: "Camping", classic: "Tented camps", luxury: "Luxury lodges" },
  { name: "Meals included", budget: "Basic", classic: "Full board", luxury: "Gourmet dining" },
  { name: "Game drives", budget: true, classic: true, luxury: true },
  { name: "Professional guide", budget: true, classic: true, luxury: true },
  { name: "4x4 Safari vehicle", budget: true, classic: true, luxury: true },
  { name: "Airport transfers", budget: false, classic: true, luxury: true },
  { name: "Balloon safari", budget: false, classic: false, luxury: true },
  { name: "Private guide", budget: false, classic: false, luxury: true },
  { name: "Champagne sundowners", budget: false, classic: false, luxury: true },
  { name: "Spa treatments", budget: false, classic: false, luxury: true },
];

export default function SafariComparison() {
  const [open, setOpen] = useState(false);

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <X className="h-5 w-5 text-gray-300" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 font-heading">
          <Scale className="h-4 w-4" /> Compare Packages
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Compare Safari Packages</DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="font-heading text-sm font-semibold text-muted-foreground">Features</div>

            {["budget", "classic", "luxury"].map((type) => {
              const pkg = packages[type as keyof typeof packages];
              return (
                <Card key={type} className={type === "classic" ? "ring-2 ring-primary" : ""}>
                  <CardContent className="p-4 text-center">
                    {pkg.badge && (
                      <span className="mb-2 inline-block rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        {pkg.badge}
                      </span>
                    )}
                    <h3 className="font-heading text-lg font-bold">{pkg.name}</h3>
                    <p className="mt-1 font-heading text-2xl font-bold text-primary">{pkg.price}</p>
                    <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 space-y-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 gap-4 items-center py-3 px-2 rounded-lg ${
                  i % 2 === 0 ? "bg-muted/30" : ""
                }`}
              >
                <div className="text-sm font-medium">{feature.name}</div>
                <div className="flex justify-center">{renderCell(feature.budget)}</div>
                <div className="flex justify-center">{renderCell(feature.classic)}</div>
                <div className="flex justify-center">{renderCell(feature.luxury)}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div />
            {["budget", "classic", "luxury"].map((type) => (
              <Button
                key={type}
                className="font-heading font-semibold"
                variant={type === "classic" ? "default" : "outline"}
                onClick={() => {
                  setOpen(false);
                  const contactSection = document.getElementById("contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Select Package
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
