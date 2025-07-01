
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/pages/Index";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ personalInfo, setPersonalInfo }: PersonalInfoFormProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john.doe@email.com"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="New York, NY"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={personalInfo.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="www.johndoe.com"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
          className="mt-1 min-h-[100px]"
        />
      </div>
    </div>
  );
};
