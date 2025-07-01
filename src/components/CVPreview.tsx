
import { PersonalInfo, Experience, Education, Skill, CVStyle } from "@/pages/Index";
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CVPreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  style: CVStyle;
}

export const CVPreview = ({ personalInfo, experiences, education, skills, style }: CVPreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getStyleClasses = () => {
    switch (style) {
      case "modern":
        return {
          container: "bg-gradient-to-br from-white to-purple-50",
          header: "bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg",
          name: "text-3xl font-bold mb-2",
          contact: "text-purple-100",
          section: "border-l-4 border-purple-500 pl-4 mb-6",
          sectionTitle: "text-xl font-semibold text-purple-800 mb-3",
          accent: "text-purple-600",
        };
      case "creative":
        return {
          container: "bg-gradient-to-br from-white to-green-50",
          header: "bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-t-lg",
          name: "text-3xl font-bold mb-2",
          contact: "text-green-100",
          section: "border-l-4 border-green-500 pl-4 mb-6",
          sectionTitle: "text-xl font-semibold text-green-800 mb-3",
          accent: "text-green-600",
        };
      case "minimal":
        return {
          container: "bg-white",
          header: "border-b-2 border-gray-300 pb-6 mb-6",
          name: "text-3xl font-light text-gray-900 mb-2",
          contact: "text-gray-600",
          section: "mb-8",
          sectionTitle: "text-xl font-light text-gray-900 mb-3 uppercase tracking-wide",
          accent: "text-gray-700",
        };
      default: // professional
        return {
          container: "bg-white",
          header: "border-b border-gray-200 pb-6 mb-6",
          name: "text-3xl font-bold text-gray-900 mb-2",
          contact: "text-gray-600",
          section: "mb-6",
          sectionTitle: "text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1",
          accent: "text-blue-600",
        };
    }
  };

  const styleClasses = getStyleClasses();

  return (
    <div className={`${styleClasses.container} rounded-lg p-8 shadow-sm border max-h-[800px] overflow-y-auto`}>
      {/* Header */}
      <div className={styleClasses.header}>
        <h1 className={styleClasses.name}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        <div className={`flex flex-wrap gap-4 text-sm ${styleClasses.contact} mb-4`}>
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personalInfo.location}
            </div>
          )}
        </div>

        <div className={`flex flex-wrap gap-4 text-sm ${style === 'professional' || style === 'minimal' ? styleClasses.accent : styleClasses.contact}`}>
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className={styleClasses.section}>
          <h2 className={styleClasses.sectionTitle}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className={styleClasses.section}>
          <h2 className={styleClasses.sectionTitle}>
            Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className={style === 'professional' ? "border-l-2 border-blue-200 pl-4" : ""}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.jobTitle || "Job Title"}</h3>
                    <p className={`font-medium ${styleClasses.accent}`}>{exp.company || "Company Name"}</p>
                    {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className={styleClasses.section}>
          <h2 className={styleClasses.sectionTitle}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className={style === 'professional' ? "border-l-2 border-green-200 pl-4" : ""}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree || "Degree"}</h3>
                    <p className={`font-medium ${style === 'creative' ? 'text-green-600' : styleClasses.accent}`}>{edu.institution || "Institution"}</p>
                    {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {edu.graduationDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(edu.graduationDate)}
                      </div>
                    )}
                    {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className={styleClasses.section}>
          <h2 className={styleClasses.sectionTitle}>
            Skills
          </h2>
          <div className="space-y-3">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge key={skill.id} variant="outline" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Your CV preview will appear here</p>
          <p className="text-sm">Start filling out the form to see your professional CV</p>
        </div>
      )}
    </div>
  );
};
