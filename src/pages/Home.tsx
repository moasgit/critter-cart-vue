import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { animals } from '@/data/animals';
import { useState } from 'react';

const Home = () => {
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(animals.map(animal => animal.category))];

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || animal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(price);
  };

  return (
    <>
      <Helmet>
        <title>Djurshoppen - Köp djur online med trygg leverans</title>
        <meta name="description" content="Sveriges ledande djurshop online. Köp hundar, katter och smådjur med trygg leverans. Alla djur hälsokontrollerade. Fri frakt över 500kr." />
        <meta name="keywords" content="djur, hundar, katter, smådjur, djurshop, köp djur online, sällskapsdjur" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-primary">
                🐾 Djurshoppen
              </Link>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link to="/varukorg" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                        {cart.itemCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hitta ditt perfekta sällskapsdjur
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sveriges ledande djurshop med över 1000 nöjda kunder. Alla våra djur är hälsokontrollerade 
              och kommer med livstidsgaranti på hälsan.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Sök efter djur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Alla djur' : category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Animals Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {selectedCategory === 'all' ? 'Alla våra djur' : selectedCategory}
              </h2>
              <p className="text-muted-foreground">
                {filteredAnimals.length} {filteredAnimals.length === 1 ? 'djur' : 'djur'} tillgängliga
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAnimals.map((animal) => (
                <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative aspect-square overflow-hidden">
                    <Link to={`/djur/${animal.slug}`}>
                      <img
                        src={animal.imageUrl}
                        alt={animal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary">{animal.category}</Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      <Link to={`/djur/${animal.slug}`}>
                        {animal.name}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {animal.shortDescription}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">
                          Från {formatPrice(animal.prices.small)}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {Math.min(...Object.values(animal.stock)) === 0 ? (
                            <span className="text-destructive">Slut i lager</span>
                          ) : Math.min(...Object.values(animal.stock)) <= 5 ? (
                            <span className="text-orange-600">Få i lager</span>
                          ) : (
                            <span className="text-green-600">I lager</span>
                          )}
                        </div>
                      </div>
                      
                      <Button size="sm" asChild>
                        <Link to={`/djur/${animal.slug}`}>
                          Visa mer
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAnimals.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Inga djur hittades</h3>
                <p className="text-muted-foreground mb-4">
                  Försök med en annan sökning eller välj en annan kategori
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                  Rensa filter
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Varför välja Djurshoppen?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="font-semibold mb-2">Hälsokontrollerade djur</h3>
                <p className="text-muted-foreground">
                  Alla våra djur genomgår noggrann hälsokontroll av veterinär innan leverans
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold mb-2">Säker leverans</h3>
                <p className="text-muted-foreground">
                  Vi levererar ditt djur säkert hem till dig med specialanpassade transportmedel
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="font-semibold mb-2">Livstidsgaranti</h3>
                <p className="text-muted-foreground">
                  Vi står bakom våra djur med livstidsgaranti på medfödd hälsoproblem
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="text-2xl font-bold text-primary mb-4">
              🐾 Djurshoppen
            </div>
            <p className="text-muted-foreground mb-4">
              Sveriges ledande djurshop online - Trygg handel sedan 2020
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>📞 08-123 456 78</span>
              <span>📧 info@djurshoppen.se</span>
              <span>⏰ Mån-Fre 9-17</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;