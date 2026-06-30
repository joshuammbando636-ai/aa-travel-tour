import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFGeneratorProps {
  days: number;
  parks: string[];
  accommodation: string;
  activities: string[];
  totalPrice: number;
}

export default function PDFGenerator({ days, parks, accommodation, activities, totalPrice }: PDFGeneratorProps) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(210, 145, 80);
    doc.text("AA TRAVEL & TOURS LIMITED", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Tanzania Safari Itinerary", 105, 30, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Be Connected to the 7 Continents with Us", 105, 36, { align: "center" });

    doc.setDrawColor(210, 145, 80);
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Safari Details", 20, 50);

    const parkNames = parks.join(", ") || "Standard parks";
    const activityNames = activities.join(", ") || "Game drives included";

    const details = [
      ["Duration:", `${days} days / ${days - 1} nights`],
      ["Parks:", parkNames],
      ["Accommodation:", accommodation],
      ["Activities:", activityNames],
      ["Total Price:", `$${totalPrice.toLocaleString()} USD`],
    ];

    let yPos = 60;
    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(value, 60, yPos);
      yPos += 8;
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Day-by-Day Itinerary", 20, yPos + 10);
    yPos += 20;

    const itinerary = [
      ["Day 1", "Arrival in Arusha", "Airport pickup, hotel check-in, briefing"],
      ["Day 2", "Tarangire National Park", "Game drives, elephant herds"],
      ["Day 3", "Serengeti National Park", "Full day game viewing"],
      ["Day 4", "Serengeti - Ngorongoro", "Morning game drive, transfer"],
      ["Day 5", "Ngorongoro Crater", "Crater floor exploration"],
      ["Day 6", "Lake Manyara", "Tree-climbing lions, return to Arusha"],
      ["Day 7", "Departure", "Transfer to airport"],
    ];

    const displayItinerary = itinerary.slice(0, days);

    (doc as any).autoTable({
      startY: yPos,
      head: [["Day", "Location", "Activities"]],
      body: displayItinerary,
      theme: "striped",
      headStyles: { fillColor: [210, 145, 80] },
      margin: { left: 20, right: 20 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Packing Checklist", 20, yPos);
    yPos += 10;

    const packingItems = [
      "Passport & visa",
      "Neutral-colored clothing",
      "Binoculars",
      "Camera with zoom lens",
      "Sunscreen (SPF 50+)",
      "Insect repellent",
      "Hat and sunglasses",
      "Comfortable walking shoes",
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    packingItems.forEach((item, i) => {
      doc.text(`• ${item}`, 25, yPos + (i * 6));
    });

    yPos += packingItems.length * 6 + 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Emergency Contacts", 20, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("24/7 Emergency: +255 787 447 553", 25, yPos);
    doc.text("Ambulance: 112 | Police: 111 | Fire: 114", 25, yPos + 6);
    doc.text("Email: trip@aatraveltz.com", 25, yPos + 12);

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("This is an estimated itinerary. Final details will be confirmed upon booking.", 105, 280, { align: "center" });

    doc.save(`AA-Travel-Safari-Itinerary-${Date.now()}.pdf`);
  };

  return (
    <Button onClick={generatePDF} variant="outline" className="w-full gap-2 font-heading">
      <FileDown className="h-4 w-4" /> Download PDF Itinerary
    </Button>
  );
}
