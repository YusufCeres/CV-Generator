
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Experience } from "@/pages/Index";

interface ExperienceFormProps {
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
}

export const ExperienceForm = ({ experiences, setExperiences }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <Card key={experience.id} className="p-4 border-2 border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">Experience Entry</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={experience.jobTitle}
                  onChange={(e) => updateExperience(experience.id, "jobTitle", e.target.value)}
                  placeholder="Software Engineer"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  placeholder="Tech Corp"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                  placeholder="San Francisco, CA"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  disabled={experience.current}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) => updateExperience(experience.id, "current", checked)}
              />
              <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
            </div>

            <div>
              <Label>Job Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addExperience} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
};
