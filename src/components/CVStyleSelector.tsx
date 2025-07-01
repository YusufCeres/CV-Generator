
import { CVStyle } from "@/pages/Index";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Palette, Briefcase, Sparkles, Minus } from "lucide-react";

interface CVStyleSelectorProps {
  selectedStyle: CVStyle;
  onStyleChange: (style: CVStyle) => void;
}

const styleOptions = [
  {
    id: "professional" as CVStyle,
    name: "Professional",
    description: "Clean and formal layout perfect for corporate roles",
    icon: Briefcase,
    preview: "bg-blue-50 border-blue-200",
  },
  {
    id: "modern" as CVStyle,
    name: "Modern",
    description: "Contemporary design with subtle colors and clean lines",
    icon: Sparkles,
    preview: "bg-purple-50 border-purple-200",
  },
  {
    id: "creative" as CVStyle,
    name: "Creative",
    description: "Bold and colorful design for creative professionals",
    icon: Palette,
    preview: "bg-green-50 border-green-200",
  },
  {
    id: "minimal" as CVStyle,
    name: "Minimal",
    description: "Simple and clean design focusing on content",
    icon: Minus,
    preview: "bg-gray-50 border-gray-200",
  },
];

export const CVStyleSelector = ({ selectedStyle, onStyleChange }: CVStyleSelectorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose CV Style</h3>
        <p className="text-gray-600 text-sm">
          Select a style that best represents your professional image
        </p>
      </div>

      <RadioGroup value={selectedStyle} onValueChange={onStyleChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {styleOptions.map((style) => {
            const Icon = style.icon;
            return (
              <div key={style.id} className="relative">
                <RadioGroupItem
                  value={style.id}
                  id={style.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={style.id}
                  className="cursor-pointer"
                >
                  <Card className={`p-4 transition-all duration-200 hover:shadow-md peer-checked:ring-2 peer-checked:ring-blue-500 peer-checked:border-blue-500 ${
                    selectedStyle === style.id ? "ring-2 ring-blue-500 border-blue-500" : ""
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${style.preview}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{style.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {style.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};
