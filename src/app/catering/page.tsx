"use client";

import { useState } from "react";
import { CustomerLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Clock,
  CheckCircle,
  UtensilsCrossed,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Star,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const cateringPackages = [
  {
    name: "Small Gathering",
    guests: "10-20",
    price: "From $149",
    description: "Perfect for small office lunches or family gatherings",
    includes: [
      "10 Classic Fire Birds",
      "Large Fries (Family Size)",
      "Coleslaw",
      "12 Drinks",
      "Plates & Napkins",
    ],
    popular: false,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
  },
  {
    name: "Party Pack",
    guests: "25-50",
    price: "From $299",
    description: "Great for birthday parties and team events",
    includes: [
      "25 Mixed Chicken Pieces",
      "2 Large Fries",
      "Onion Rings",
      "2 Coleslaws",
      "24 Drinks",
      "Full Serving Setup",
    ],
    popular: true,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
  },
  {
    name: "Corporate Event",
    guests: "50-100",
    price: "From $549",
    description: "Professional catering for corporate events and meetings",
    includes: [
      "50 Mixed Chicken Pieces",
      "4 Large Fries",
      "2 Onion Rings",
      "4 Coleslaws",
      "50 Drinks",
      "Full Serving Setup",
      "Dedicated Staff",
    ],
    popular: false,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  },
  {
    name: "Grand Feast",
    guests: "100+",
    price: "Custom",
    description: "For large events, weddings, and festivals",
    includes: [
      "Custom Menu Options",
      "Unlimited Sides",
      "Premium Desserts",
      "Full Bar Service",
      "Event Coordinator",
      "Custom Branding",
    ],
    popular: false,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
  },
];

const eventTypes = [
  "Corporate Event",
  "Birthday Party",
  "Wedding Reception",
  "Family Reunion",
  "Sports Team Event",
  "Fundraiser",
  "Holiday Party",
  "Other",
];

export default function CateringPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    date: "",
    location: "",
    message: "",
  });
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 text-primary-foreground sm:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <UtensilsCrossed className="mr-1 h-3 w-3" />
              Catering Services
            </Badge>
            <h1 className="text-4xl font-heading font-bold sm:text-5xl">
              Let Us Cater Your Event
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90">
              From intimate gatherings to grand celebrations, we&apos;ll bring the
              fire to your feast!
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="#packages">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  View Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">
              Why Choose FireBird Catering?
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: UtensilsCrossed,
                title: "Fresh & Hot",
                description: "All food is prepared fresh and delivered hot to your event.",
                image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80",
              },
              {
                icon: Users,
                title: "Full Service",
                description: "We handle everything from setup to cleanup.",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=80",
              },
              {
                icon: Heart,
                title: "Customizable",
                description: "Tailor the menu to your preferences.",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white">
                        <item.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-heading font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">
              Catering Packages
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Choose the perfect package for your event
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cateringPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    selectedPackage === pkg.name
                      ? "border-primary border-2"
                      : pkg.popular
                      ? "border-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedPackage(pkg.name)}
                >
                  <div className="relative h-32">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {pkg.popular && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-sm font-medium">
                        {pkg.guests} guests
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-heading font-bold">{pkg.name}</h3>
                    <p className="text-2xl font-bold text-primary mt-1">{pkg.price}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
                    <ul className="mt-4 space-y-2">
                      {pkg.includes.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          {item}
                        </li>
                      ))}
                      {pkg.includes.length > 4 && (
                        <li className="text-xs text-muted-foreground">
                          +{pkg.includes.length - 4} more items
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Badge className="mb-4">
                <Mail className="mr-1 h-3 w-3" />
                Get in Touch
              </Badge>
              <h2 className="text-3xl font-heading font-bold">
                Request a Quote
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you within 24 hours
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                    <CardContent className="py-12 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                      </motion.div>
                      <h3 className="mt-4 text-2xl font-heading font-bold">
                        Thank You!
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        We&apos;ve received your catering request. Our team will
                        contact you within 24 hours.
                      </p>
                      <Button
                        className="mt-6"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            eventType: "",
                            guests: "",
                            date: "",
                            location: "",
                            message: "",
                          });
                        }}
                      >
                        Submit Another Request
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80"
                        alt="Catering"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                    <CardContent className="p-6 sm:p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="name">Your Name *</Label>
                            <Input
                              id="name"
                              placeholder="John Doe"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                            />
                          </motion.div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Label htmlFor="phone">Phone *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="(555) 123-4567"
                              required
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Label htmlFor="event-type">Event Type *</Label>
                            <select
                              id="event-type"
                              required
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              value={formData.eventType}
                              onChange={(e) =>
                                setFormData({ ...formData, eventType: e.target.value })
                              }
                            >
                              <option value="">Select event type</option>
                              {eventTypes.map((type) => (
                                <option key={type} value={type.toLowerCase()}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Label htmlFor="guests">Number of Guests *</Label>
                            <Input
                              id="guests"
                              type="number"
                              placeholder="25"
                              required
                              value={formData.guests}
                              onChange={(e) =>
                                setFormData({ ...formData, guests: e.target.value })
                              }
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <Label htmlFor="date">Event Date *</Label>
                            <Input
                              id="date"
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                              }
                            />
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Label htmlFor="location">Event Location *</Label>
                          <Input
                            id="location"
                            placeholder="123 Main St, New York, NY"
                            required
                            value={formData.location}
                            onChange={(e) =>
                              setFormData({ ...formData, location: e.target.value })
                            }
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <Label htmlFor="message">Special Requests</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your event, dietary restrictions, or any special requests..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <Button type="submit" size="lg" className="w-full">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Submit Request
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Info */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-muted-foreground">
                        catering@firebirdchicken.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </CustomerLayout>
  );
}
