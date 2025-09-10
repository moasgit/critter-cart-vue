import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { animals } from '@/data/animals';
import { Animal, AnimalSize } from '@/types/animal';
import Header from '@/components/Header';

const AnimalDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const { addItem } = useCart();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [selectedSize, setSelectedSize] = useState<AnimalSize>('medium');
  const [quantity, setQuantity] = useState(1);
  const [relatedAnimals, setRelatedAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const foundAnimal = animals.find(a => a.slug === slug);
    if (foundAnimal) {
      setAnimal(foundAnimal);
      // Find 3 related animals from the same category
      const related = animals
        .filter(a => a.category === foundAnimal.category && a.id !== foundAnimal.id)
        .slice(0, 3);
      setRelatedAnimals(related);
    }
  }, [slug]);

  if (!animal) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Djur inte hittat</h1>
            <Link to="/" className="text-primary hover:underline">
              Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentPrice = animal.prices[selectedSize];
  const currentStock = animal.stock[selectedSize];
  const maxQuantity = Math.min(10, currentStock);

  const getStockStatus = () => {
    if (currentStock === 0) return 'Slut i lager';
    if (currentStock <= 2) return 'Få i lager';
    return 'I lager';
  };

  const getStockBadgeVariant = () => {
    if (currentStock === 0) return 'destructive';
    if (currentStock <= 2) return 'secondary';
    return 'default';
  };

  const handleAddToCart = () => {
    if (currentStock === 0) return;

    addItem({
      id: animal.id,
      name: animal.name,
      slug: animal.slug,
      size: selectedSize,
      price: currentPrice,
      imageUrl: animal.imageUrl
    }, quantity);

    toast({
      title: "Tillagt i varukorg!",
      description: `${quantity} st ${animal.name} (${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}) tillagd i varukorgen.`,
      action: (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Fortsätt handla</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/varukorg">Gå till varukorg</Link>
          </Button>
        </div>
      ),
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(price);
  };

  const sizeLabels = {
    small: 'Liten',
    medium: 'Medium',
    large: 'Stor'
  };

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": animal.name,
    "image": animal.imageUrl,
    "description": animal.longDescription,
    "category": animal.category,
    "brand": {
      "@type": "Brand",
      "name": "Djurshoppen"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "SEK",
      "price": currentPrice,
      "availability": currentStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `${window.location.origin}/djur/${animal.slug}`
    }
  };

  return (
    <>
      <Helmet>
        <title>{animal.seoTitle}</title>
        <meta name="description" content={animal.seoDescription} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka till alla djur
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hero Image */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {animal.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {animal.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${animal.name} ${index + 1}`}
                      className="aspect-square object-cover rounded-md border cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {animal.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{animal.name}</h1>
                <p className="text-muted-foreground text-lg">{animal.shortDescription}</p>
              </div>

              {/* Size Selector */}
              <div>
                <h3 className="font-semibold mb-3">Välj storlek</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(sizeLabels).map(([size, label]) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size as AnimalSize)}
                      disabled={animal.stock[size as AnimalSize] === 0}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">{label}</span>
                      <span className="text-sm">
                        {formatPrice(animal.prices[size as AnimalSize])}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <Badge variant={getStockBadgeVariant()}>{getStockStatus()}</Badge>
                {currentStock > 0 && currentStock <= 5 && (
                  <span className="text-sm text-muted-foreground">
                    {currentStock} st kvar
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="text-3xl font-bold">
                {formatPrice(currentPrice)}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  inkl. moms (25%)
                </span>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="font-semibold mb-3">Antal</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    (max {maxQuantity} st)
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={currentStock === 0}
                  className="flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {currentStock === 0 ? 'Slut i lager' : 'Lägg i varukorg'}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-3">Beskrivning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {animal.longDescription}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold mb-3">Egenskaper</h3>
                <div className="flex flex-wrap gap-2">
                  {animal.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Animals */}
          {relatedAnimals.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Relaterade djur</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedAnimals.map((relatedAnimal) => (
                  <Card key={relatedAnimal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedAnimal.imageUrl}
                        alt={relatedAnimal.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {relatedAnimal.category}
                      </Badge>
                      <h3 className="font-semibold mb-2">{relatedAnimal.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {relatedAnimal.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">
                          Från {formatPrice(relatedAnimal.prices.small)}
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/djur/${relatedAnimal.slug}`}>
                            Visa mer
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnimalDetail;