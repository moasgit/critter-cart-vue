import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { animals } from '@/data/animals';
import { AnimalSize } from '@/types/animal';

const Cart = () => {
  const { cart, removeItem, updateQuantity, updateSize, clearCart } = useCart();

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

  const shippingCost = cart.total >= 500 ? 0 : 99;
  const totalWithShipping = cart.total + shippingCost;

  const handleSizeChange = (itemId: string, currentSize: AnimalSize, newSize: AnimalSize) => {
    const animal = animals.find(a => a.id === itemId);
    if (animal) {
      const newPrice = animal.prices[newSize];
      updateSize(itemId, currentSize, newSize, newPrice);
    }
  };

  if (cart.items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Varukorg - Tom | Djurshoppen</title>
          <meta name="description" content="Din varukorg är tom. Utforska vårt sortiment av djur och hitta ditt perfekta sällskapsdjur." />
        </Helmet>

        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Din varukorg är tom</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Du har inte lagt till några djur i varukorgen än. Utforska vårt sortiment och hitta ditt perfekta sällskapsdjur!
            </p>
            <Button size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Börja handla
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Varukorg ({cart.itemCount} produkter) | Djurshoppen</title>
        <meta name="description" content="Granska din varukorg och slutför ditt köp av djur från Djurshoppen." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Varukorg</h1>
            <p className="text-muted-foreground">
              {cart.itemCount} {cart.itemCount === 1 ? 'produkt' : 'produkter'} i varukorgen
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fortsätt handla
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const animal = animals.find(a => a.id === item.id);
              const maxQuantity = animal ? Math.min(10, animal.stock[item.size]) : 10;

              return (
                <Card key={`${item.id}-${item.size}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link to={`/djur/${item.slug}`} className="flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg border hover:opacity-75 transition-opacity"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              <Link to={`/djur/${item.slug}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-muted-foreground">
                              {animal?.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.size)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {/* Size Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Storlek:</span>
                            <Select
                              value={item.size}
                              onValueChange={(newSize: AnimalSize) => 
                                handleSizeChange(item.id, item.size, newSize)
                              }
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(sizeLabels).map(([size, label]) => (
                                  <SelectItem 
                                    key={size} 
                                    value={size}
                                    disabled={animal ? animal.stock[size as AnimalSize] === 0 : false}
                                  >
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Antal:</span>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                disabled={item.quantity >= maxQuantity}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="ml-auto">
                            <div className="text-sm text-muted-foreground">
                              {formatPrice(item.price)} × {item.quantity}
                            </div>
                            <div className="font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Clear Cart */}
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={clearCart}>
                Töm varukorg
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Beställningsöversikt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Delsumma ({cart.itemCount} produkter)</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Frakt</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Fri frakt vid köp över {formatPrice(500)}
                  </p>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Totalt</span>
                  <span>{formatPrice(totalWithShipping)}</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Moms (25%) ingår i priset
                </p>

                <div className="space-y-3 pt-4">
                  <Button size="lg" className="w-full">
                    Till kassan
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link to="/">
                      Fortsätt handla
                    </Link>
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>✓ Säker betalning</p>
                  <p>✓ 14 dagars öppet köp</p>
                  <p>✓ Hälsokontroll på alla djur</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;