
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "@/pages/Index";

interface EducationFormProps {
  education: Education[];
  setEducation: (education: Education[]) => void;
}

export const EducationForm = ({ education, setEducation }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
      description: "",
    };
    setEducation([...education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <Card key={edu.id} className="p-4 border-2 border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">Education Entry</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  placeholder="University of California"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                  placeholder="Berkeley, CA"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Graduation Date</Label>
                <Input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                  placeholder="3.8"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Additional Details</Label>
              <Textarea
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                placeholder="Relevant coursework, honors, activities..."
                className="mt-1 min-h-[60px]"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addEducation} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};
