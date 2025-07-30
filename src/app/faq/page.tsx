
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We offer a range of services including full-service wedding planning, destination wedding curation, decor and styling, and partial planning. We can customize a package to perfectly fit your needs."
    },
    {
        question: "How far in advance should we book you?",
        answer: "We recommend booking us at least 10-12 months in advance, especially for popular wedding dates. For destination weddings, 12-18 months is ideal. However, don't hesitate to reach out if your timeline is shorter!"
    },
    {
        question: "Do you plan weddings outside of the Greater Seattle Area?",
        answer: "Absolutely! We specialize in destination weddings across the US and internationally. From the sunny beaches of Florida to the Hawaiian islands and the vineyards of Napa Valley, we've planned weddings all over the world."
    },
    {
        question: "How do you determine your fees?",
        answer: "Our fees are based on the scope of work, complexity of the event, and level of service required. We typically charge a percentage of the total wedding budget or a flat management fee. We are fully transparent about our pricing structure from the very beginning."
    },
    {
        question: "Can you work with vendors we have already chosen?",
        answer: "Of course. We are happy to collaborate with vendors you've already selected. We also have a curated list of trusted partners we can recommend to ensure quality and reliability."
    }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Got questions? We've got answers. Here are some of the things we get asked the most.
        </p>
      </div>

      <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                 <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-headline text-xl">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
