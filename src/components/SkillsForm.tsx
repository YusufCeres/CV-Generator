
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { Skill } from "@/pages/Index";

interface SkillsFormProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

export const SkillsForm = ({ skills, setSkills }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState({ name: "", category: "", level: 3 });

  const skillCategories = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Tools & Technologies",
    "Databases",
    "Cloud Services",
    "Soft Skills",
    "Languages",
    "Other"
  ];

  const addSkill = () => {
    if (newSkill.name && newSkill.category) {
      const skill: Skill = {
        id: crypto.randomUUID(),
        name: newSkill.name,
        category: newSkill.category,
        level: newSkill.level,
      };
      setSkills([...skills, skill]);
      setNewSkill({ name: "", category: "", level: 3 });
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const getLevelText = (level: number) => {
    const levels = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
    return levels[level - 1] || "Intermediate";
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Add New Skill</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Skill Name</Label>
            <Input
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="React, Python, Leadership..."
              className="mt-1"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Proficiency Level</Label>
            <Select value={newSkill.level.toString()} onValueChange={(value) => setNewSkill({ ...newSkill, level: parseInt(value) })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Beginner</SelectItem>
                <SelectItem value="2">Basic</SelectItem>
                <SelectItem value="3">Intermediate</SelectItem>
                <SelectItem value="4">Advanced</SelectItem>
                <SelectItem value="5">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={addSkill} className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills by Category */}
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1 text-sm"
              >
                <span>{skill.name}</span>
                <span className="text-xs text-gray-500">({getLevelText(skill.level)})</span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-gray-400 hover:text-red-500 ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
};
