'use client';
// This page is deprecated per request. Redirecting to home.
export { default } from 'next/dist/client/image';


import React, { useState, useEffect } from 'react';
import { Seo } from '@/components/seo';
import { RoyalBackground } from '@/components/royal-background';
import { useAnimation } from '@/hooks/use-animation-preferences';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  IndianRupee, 
  DollarSign, 
  Users, 
  Utensils, 
  Camera, 
  Music, 
  Flower, 
  Car, 
  Home, 
  Gift, 
  Sparkles 
} from 'lucide-react';

interface BudgetItem {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  icon: React.ReactNode;
  description: string;
  tips: string[];
}

const WeddingCalculatorPage = () => {
  const { shouldAnimate } = useAnimation();
  const [totalBudget, setTotalBudget] = useState<number>(30000);
  const [guestCount, setGuestCount] = useState<number>(150);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number>(83); // 1 USD = 83 INR (approx)

  // Initialize budget items
  useEffect(() => {
    const initialBudgetItems: BudgetItem[] = [
      {
        id: 'venue',
        name: 'Venue & Catering',
        percentage: 40,
        amount: 0,
        icon: <Home className="h-5 w-5 text-rose-500" />,
        description: 'Includes venue rental, food, beverages, and service staff.',
        tips: [
          'Consider weekday or off-season dates for better rates',
          'Lunch receptions are typically less expensive than dinner',
          'Buffet style is more economical than plated service'
        ]
      },
      {
        id: 'decor',
        name: 'Decorations & Flowers',
        percentage: 15,
        amount: 0,
        icon: <Flower className="h-5 w-5 text-rose-500" />,
        description: 'Includes mandap, stage decorations, centerpieces, and floral arrangements.',
        tips: [
          'Use the same flowers for ceremony and reception',
          'Focus on key areas like the mandap and head table',
          'Consider silk flowers for some arrangements'
        ]
      },
      {
        id: 'attire',
        name: 'Attire & Jewelry',
        percentage: 10,
        amount: 0,
        icon: <Sparkles className="h-5 w-5 text-rose-500" />,
        description: 'Includes wedding outfits, jewelry, accessories, and beauty services.',
        tips: [
          'Consider renting designer outfits instead of buying',
          'Shop during sale seasons for better deals',
          'Family heirloom jewelry can save significant costs'
        ]
      },
      {
        id: 'photo',
        name: 'Photography & Videography',
        percentage: 10,
        amount: 0,
        icon: <Camera className="h-5 w-5 text-rose-500" />,
        description: 'Includes professional photographers and videographers for all events.',
        tips: [
          'Book the same team for both photography and videography for package deals',
          'Prioritize key events if on a tight budget',
          'Consider digital-only packages and print photos later'
        ]
      },
      {
        id: 'music',
        name: 'Music & Entertainment',
        percentage: 7,
        amount: 0,
        icon: <Music className="h-5 w-5 text-rose-500" />,
        description: 'Includes DJ, live musicians, dancers, and other entertainment.',
        tips: [
          'DJs are typically less expensive than live bands',
          'Book entertainment for key moments rather than the entire event',
          'Consider talented friends or family members for some performances'
        ]
      },
      {
        id: 'transport',
        name: 'Transportation',
        percentage: 5,
        amount: 0,
        icon: <Car className="h-5 w-5 text-rose-500" />,
        description: 'Includes baraat procession, wedding car, and guest shuttles.',
        tips: [
          'Choose venues close to accommodations to minimize transportation needs',
          'Rent decorative vehicles only for key moments',
          'Consider group transportation options for guests'
        ]
      },
      {
        id: 'favors',
        name: 'Favors & Gifts',
        percentage: 3,
        amount: 0,
        icon: <Gift className="h-5 w-5 text-rose-500" />,
        description: 'Includes guest favors, wedding party gifts, and family presents.',
        tips: [
          'Homemade favors can be both personal and economical',
          'Consider useful items that guests will actually use',
          'Bulk purchases can significantly reduce per-item costs'
        ]
      },
      {
        id: 'misc',
        name: 'Miscellaneous & Buffer',
        percentage: 10,
        amount: 0,
        icon: <Calculator className="h-5 w-5 text-rose-500" />,
        description: 'Includes invitations, marriage license, unexpected expenses, and contingency.',
        tips: [
          'Always keep a 10% buffer for unexpected expenses',
          'Digital invitations can save on printing and postage costs',
          'Prioritize what matters most to you and be willing to compromise on the rest'
        ]
      },
    ];

    // Calculate initial amounts
    const updatedItems = initialBudgetItems.map(item => ({
      ...item,
      amount: (totalBudget * item.percentage) / 100
    }));

    setBudgetItems(updatedItems);
  }, []);

  // Update amounts when total budget changes
  useEffect(() => {
    const updatedItems = budgetItems.map(item => ({
      ...item,
      amount: (totalBudget * item.percentage) / 100
    }));

    setBudgetItems(updatedItems);
  }, [totalBudget]);

  // Format currency
  const formatCurrency = (amount: number): string => {
    if (currency === 'INR') {
      const inrAmount = amount * exchangeRate;
      return `₹${inrAmount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  // Calculate per guest cost
  const perGuestCost = guestCount > 0 ? totalBudget / guestCount : 0;

  // Handle percentage change for an item
  const handlePercentageChange = (id: string, newPercentage: number) => {
    const updatedItems = budgetItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          percentage: newPercentage,
          amount: (totalBudget * newPercentage) / 100
        };
      }
      return item;
    });

    setBudgetItems(updatedItems);
  };

  // Calculate total percentage (should be 100%)
  const totalPercentage = budgetItems.reduce((sum, item) => sum + item.percentage, 0);

  return (
    <>
      <Seo 
        title="Indian Wedding Budget Calculator" 
        description="Plan your perfect Indian wedding with our budget calculator. Estimate costs for venue, catering, decor, attire, and more based on your guest count and total budget."
      />
      <div className="flex flex-col relative min-h-screen">
        {shouldAnimate && <RoyalBackground />}
        <div className="relative z-10 container mx-auto px-4 py-12 mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                Indian Wedding Budget Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Plan your perfect wedding with our interactive budget calculator. Adjust your total budget, 
                guest count, and allocation to see how it affects your wedding expenses.
              </p>
            </div>

            <Card className="p-6 mb-8 bg-card/95 backdrop-blur-sm border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Wedding Budget</label>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{currency === 'USD' ? '$' : '₹'}</span>
                    <Input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(Number(e.target.value))}
                      className="flex-1"
                      min={5000}
                      max={500000}
                    />
                  </div>
                  <div className="mt-2">
                    <Slider
                      value={[totalBudget]}
                      min={5000}
                      max={100000}
                      step={1000}
                      onValueChange={(value) => setTotalBudget(value[0] || 0)}
                      className="my-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$5,000</span>
                      <span>$100,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <Input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="flex-1"
                      min={10}
                      max={1000}
                    />
                  </div>
                  <div className="mt-2">
                    <Slider
                      value={[guestCount]}
                      min={10}
                      max={500}
                      step={10}
                      onValueChange={(value) => setGuestCount(value[0] || 0)}
                      className="my-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10 guests</span>
                      <span>500 guests</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm font-medium">Cost per Guest</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(perGuestCost)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Currency</p>
                  <div className="flex gap-2 mt-1">
                    <Button
                      size="sm"
                      variant={currency === 'USD' ? 'default' : 'outline'}
                      onClick={() => setCurrency('USD')}
                      className="gap-1"
                    >
                      <DollarSign className="h-4 w-4" /> USD
                    </Button>
                    <Button
                      size="sm"
                      variant={currency === 'INR' ? 'default' : 'outline'}
                      onClick={() => setCurrency('INR')}
                      className="gap-1"
                    >
                      <IndianRupee className="h-4 w-4" /> INR
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Budget Allocation</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Adjust the percentages to customize your budget allocation. Total: {totalPercentage}%
                  {totalPercentage !== 100 && (
                    <span className="text-rose-500 ml-2">
                      (Should equal 100%)
                    </span>
                  )}
                </p>

                <div className="space-y-6">
                  {budgetItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="md:col-span-1">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Slider
                          value={[item.percentage]}
                          min={0}
                          max={70}
                          step={1}
                          onValueChange={(value) => handlePercentageChange(item.id, value[0] || 0)}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>0%</span>
                          <span>{item.percentage}%</span>
                          <span>70%</span>
                        </div>
                      </div>
                      <div className="md:col-span-1 text-right">
                        <p className="font-bold text-primary">{formatCurrency(item.amount)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Tabs defaultValue="breakdown" className="mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="breakdown">Budget Breakdown</TabsTrigger>
                <TabsTrigger value="tips">Money-Saving Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="breakdown" className="mt-6">
                <Card className="p-6 bg-card/95 backdrop-blur-sm border-primary/20">
                  <h2 className="text-xl font-semibold mb-4">Detailed Budget Breakdown</h2>
                  <div className="space-y-6">
                    {budgetItems.map((item) => (
                      <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <h3 className="font-medium">{item.name}</h3>
                          </div>
                          <p className="font-bold text-primary">{formatCurrency(item.amount)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="tips" className="mt-6">
                <Card className="p-6 bg-card/95 backdrop-blur-sm border-primary/20">
                  <h2 className="text-xl font-semibold mb-4">Money-Saving Tips</h2>
                  <div className="space-y-6">
                    {budgetItems.map((item) => (
                      <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          {item.icon}
                          <h3 className="font-medium">{item.name}</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {item.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-muted-foreground">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <h2 className="text-2xl font-playfair font-bold mb-4">Ready to Start Planning?</h2>
              <p className="text-muted-foreground mb-6">
                Let our expert wedding planners help you create your dream Indian wedding within your budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Calculator className="h-5 w-5" />
                  Save My Budget Plan
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact">Contact Our Planners</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default WeddingCalculatorPage; // Disabled per request
