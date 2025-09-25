import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type Product = {
  code:
    | 'motor'
    | 'medical'
    | 'home'
    | 'kipf'
    | 'wekapesa'
    | 'travel'
    | 'pa'
    | 'pet'
    | 'income'
    | 'home-office';
  name: string;
};

const PRODUCTS: Product[] = [
  { code: 'motor', name: 'Motor' },
  { code: 'medical', name: 'Medical' },
  { code: 'home', name: 'Home' },
  { code: 'kipf', name: 'Pension (KIPF)' },
  { code: 'wekapesa', name: 'Wekapesa' },
  { code: 'travel', name: 'Travel' },
  { code: 'pa', name: 'Personal Accident' },
  { code: 'pet', name: 'Pet Insurance' },
  { code: 'income', name: 'Income Protection' },
  { code: 'home-office', name: 'Home Office' },
];

export default function KycPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">KYC</h1>
        <p className="text-muted-foreground">Know Your Customer workflows (coming soon)</p>
      </div>

      <Tabs defaultValue="motor" className="w-full">
        <TabsList>
          {PRODUCTS.map((p) => (
            <TabsTrigger key={p.code} value={p.code}>
              {p.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {PRODUCTS.map((p) => (
          <TabsContent key={p.code} value={p.code}>
            <Card>
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
                <CardDescription>
                  Product code: <Badge variant="secondary">{p.code}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Coming soon: Forms, uploads, validation, and submission flows.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
