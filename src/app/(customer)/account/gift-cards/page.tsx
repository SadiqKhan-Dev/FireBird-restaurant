"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Gift, CreditCard, Plus, Send, History } from "lucide-react";

const mockGiftCards = [
  {
    id: "1",
    code: "FIREBIRD-XXXX-1234",
    balance: 45.00,
    originalAmount: 100.00,
    status: "active",
    purchasedAt: "2026-06-15T00:00:00Z",
  },
  {
    id: "2",
    code: "FIREBIRD-XXXX-5678",
    balance: 0,
    originalAmount: 25.00,
    status: "used",
    purchasedAt: "2026-05-20T00:00:00Z",
  },
];

const presetAmounts = [10, 25, 50, 75, 100, 150, 200];

export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState(mockGiftCards);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");

  const totalBalance = giftCards
    .filter((card) => card.status === "active")
    .reduce((sum, card) => sum + card.balance, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Gift Cards</h1>
          <p className="text-muted-foreground">
            Purchase and manage gift cards
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
            <DialogTrigger render={<Button variant="outline"><Send className="mr-2 h-4 w-4" />Send Gift Card</Button>} />
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send a Gift Card</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipient-email">Recipient Email</Label>
                  <Input id="recipient-email" type="email" placeholder="friend@example.com" />
                </div>
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input id="amount" type="number" min="5" max="200" placeholder="50" />
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Input id="message" placeholder="Happy Birthday!" />
                </div>
                <Button className="w-full" onClick={() => setIsSendDialogOpen(false)}>
                  Send Gift Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isPurchaseDialogOpen} onOpenChange={setIsPurchaseDialogOpen}>
            <DialogTrigger render={<Button><Plus className="mr-2 h-4 w-4" />Buy Gift Card</Button>} />
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Buy a Gift Card</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Amount</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="custom-amount">Or Enter Custom Amount</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    min="5"
                    max="200"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                  />
                </div>
                <Button className="w-full" onClick={() => setIsPurchaseDialogOpen(false)}>
                  Add to Cart - ${(selectedAmount || Number(customAmount) || 0).toFixed(2)}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Gift Card Balance</p>
              <p className="text-4xl font-bold">${totalBalance.toFixed(2)}</p>
            </div>
            <CreditCard className="h-12 w-12 opacity-50" />
          </div>
        </CardContent>
      </Card>

      {/* Gift Cards List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            My Gift Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {giftCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono font-medium">{card.code}</p>
                    <p className="text-sm text-muted-foreground">
                      Purchased {new Date(card.purchasedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      ${card.balance.toFixed(2)}
                    </span>
                    <Badge
                      variant={card.status === "active" ? "default" : "secondary"}
                    >
                      {card.status === "active" ? "Active" : "Used"}
                    </Badge>
                  </div>
                  {card.status === "active" && (
                    <p className="text-xs text-muted-foreground">
                      of ${card.originalAmount.toFixed(2)} original
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
