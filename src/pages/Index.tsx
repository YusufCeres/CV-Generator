import { useState } from "react";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { ExperienceForm } from "@/components/ExperienceForm";
import { EducationForm } from "@/components/EducationForm";
import { SkillsForm } from "@/components/SkillsForm";
import { CVPreview } from "@/components/CVPreview";
import { CVStyleSelector } from "@/components/CVStyleSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import { generateEnhancedContent } from "@/utils/geminiService";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export type CVStyle = "professional" | "modern" | "creative" | "minimal";

const Index = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [cvStyle, setCvStyle] = useState<CVStyle>("professional");
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhanceWithAI = async () => {
    setIsEnhancing(true);
    try {
      // Enhance personal summary
      if (personalInfo.summary) {
        const enhancedSummary = await generateEnhancedContent(
          `Professional Summary: ${personalInfo.summary}`,
          "summary"
        );
        setPersonalInfo(prev => ({ ...prev, summary: enhancedSummary }));
      }

      // Enhance experience descriptions
      const enhancedExperiences = await Promise.all(
        experiences.map(async (exp) => {
          if (exp.description) {
            const enhancedDescription = await generateEnhancedContent(
              `Job Experience at ${exp.company} as ${exp.jobTitle}: ${exp.description}`,
              "experience"
            );
            return { ...exp, description: enhancedDescription };
          }
          return exp;
        })
      );
      setExperiences(enhancedExperiences);

      toast.success("CV content enhanced with AI!");
    } catch (error) {
      console.error("Enhancement error:", error);
      toast.error("Failed to enhance content. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleDownload = () => {
    // This would typically convert the CV to PDF
    toast.success("CV download functionality would be implemented here!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI CV Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a professional CV with AI-powered content enhancement
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Build Your CV</h2>
                <Button 
                  onClick={handleEnhanceWithAI}
                  disabled={isEnhancing}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isEnhancing ? "Enhancing..." : "Enhance with AI"}
                </Button>
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoForm 
                    personalInfo={personalInfo}
                    setPersonalInfo={setPersonalInfo}
                  />
                </TabsContent>

                <TabsContent value="experience">
                  <ExperienceForm 
                    experiences={experiences}
                    setExperiences={setExperiences}
                  />
                </TabsContent>

                <TabsContent value="education">
                  <EducationForm 
                    education={education}
                    setEducation={setEducation}
                  />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsForm 
                    skills={skills}
                    setSkills={setSkills}
                  />
                </TabsContent>

                <TabsContent value="style">
                  <CVStyleSelector 
                    selectedStyle={cvStyle}
                    onStyleChange={setCvStyle}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">CV Preview</h2>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <CVPreview 
                personalInfo={personalInfo}
                experiences={experiences}
                education={education}
                skills={skills}
                style={cvStyle}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
