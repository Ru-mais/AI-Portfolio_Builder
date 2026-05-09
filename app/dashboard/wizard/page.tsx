"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Palette, 
  Rocket, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: "personal", title: "Personal Details", icon: User },
  { id: "career", title: "Experience & Education", icon: Briefcase },
  { id: "projects", title: "Featured Project", icon: Rocket },
  { id: "style", title: "Visual Style", icon: Palette },
];

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    bio: "",
    // Experience
    expCompany: "",
    expPosition: "",
    expDescription: "",
    // Education
    eduSchool: "",
    eduDegree: "",
    // Project
    projTitle: "",
    projDescription: "",
    // Style
    primaryColor: "indigo",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wizard", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Portfolio built successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to build portfolio.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-black tracking-tight">Portfolio Wizard</h1>
        <p className="text-slate-500">Let's set up your entire portfolio in 2 minutes.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between px-4">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center gap-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
              i <= currentStep ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-slate-400"
            }`}>
              {i < currentStep ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              i <= currentStep ? "text-indigo-600" : "text-slate-400"
            }`}>
              {step.title.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      <Card className="border-slate-100 shadow-2xl dark:border-slate-800">
        <CardContent className="pt-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">What's your full name?</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">What's your current job role?</Label>
                  <Input 
                    id="jobTitle" 
                    placeholder="Senior Fullstack Developer" 
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Description</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Briefly describe what you do..." 
                    className="min-h-[120px]"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="career"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-indigo-600" /> Recent Experience
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input 
                      placeholder="Company Name" 
                      value={formData.expCompany}
                      onChange={(e) => setFormData({...formData, expCompany: e.target.value})}
                    />
                    <Input 
                      placeholder="Your Position" 
                      value={formData.expPosition}
                      onChange={(e) => setFormData({...formData, expPosition: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-indigo-600" /> Education
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input 
                      placeholder="University/School" 
                      value={formData.eduSchool}
                      onChange={(e) => setFormData({...formData, eduSchool: e.target.value})}
                    />
                    <Input 
                      placeholder="Degree/Field of Study" 
                      value={formData.eduDegree}
                      onChange={(e) => setFormData({...formData, eduDegree: e.target.value})}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="projTitle">Project Title</Label>
                  <Input 
                    id="projTitle" 
                    placeholder="My Awesome App" 
                    value={formData.projTitle}
                    onChange={(e) => setFormData({...formData, projTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projDescription">Project Description</Label>
                  <Textarea 
                    id="projDescription" 
                    placeholder="What did you build and why?" 
                    className="min-h-[120px]"
                    value={formData.projDescription}
                    onChange={(e) => setFormData({...formData, projDescription: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="style"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <Label className="text-lg">Pick your brand color</Label>
                  <RadioGroup 
                    defaultValue="indigo" 
                    className="grid grid-cols-3 gap-4"
                    onValueChange={(val) => setFormData({...formData, primaryColor: val})}
                  >
                    {[
                      { id: "indigo", color: "bg-indigo-600", label: "Legacy Indigo" },
                      { id: "emerald", color: "bg-emerald-600", label: "Forest Green" },
                      { id: "rose", color: "bg-rose-600", label: "Sunset Rose" },
                      { id: "amber", color: "bg-amber-600", label: "Solar Amber" },
                      { id: "slate", color: "bg-slate-900", label: "Midnight Slate" },
                      { id: "violet", color: "bg-violet-600", label: "Royal Violet" },
                    ].map((c) => (
                      <div key={c.id}>
                        <RadioGroupItem value={c.id} id={c.id} className="peer sr-only" />
                        <Label
                          htmlFor={c.id}
                          className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-100 bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50/50 cursor-pointer transition-all dark:bg-slate-950 dark:border-slate-800"
                        >
                          <div className={`h-8 w-8 rounded-full ${c.color} shadow-lg mb-2`} />
                          <span className="text-[10px] font-bold uppercase">{c.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-slate-100 p-6 dark:border-slate-800">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button 
              className="bg-indigo-600 text-white font-bold px-8" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Build My Legacy"}
            </Button>
          ) : (
            <Button 
              className="bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900" 
              onClick={nextStep}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
