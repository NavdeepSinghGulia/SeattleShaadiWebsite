import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const jobOpenings = [
  {
    title: "Senior Wedding Planner",
    location: "Mumbai, Full-time",
    description: "Lead our planning team, manage high-profile weddings, and mentor junior planners. 5+ years of experience required."
  },
  {
    title: "Graphic Designer",
    location: "Remote, Part-time",
    description: "Create stunning visuals, wedding invitations, and marketing materials. Proficiency in Adobe Creative Suite is a must."
  },
  {
    title: "Client Servicing Intern",
    location: "Mumbai, Internship",
    description: "A great opportunity for a passionate individual to learn the ropes of wedding planning and client management."
  }
];

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Join Our Family</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We're always looking for talented and passionate individuals to help us create magic. If you love weddings and thrive in a creative environment, you might be the one for us.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-center mb-8">Current Openings</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {jobOpenings.map((job) => (
            <Card key={job.title} className="shadow-md border-none">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                <CardDescription>{job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{job.description}</p>
              </CardContent>
              <CardFooter>
                <Button>Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
           <div className="text-center pt-8">
            <p className="text-muted-foreground">Don't see a role that fits? Send your resume to <a href="mailto:careers@vivaahverse.com" className="text-primary font-semibold">careers@vivaahverse.com</a>.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
