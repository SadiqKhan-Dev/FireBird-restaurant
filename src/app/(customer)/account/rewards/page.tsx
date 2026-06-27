"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, TrendingUp, Clock, Award, Zap } from "lucide-react";

const rewardsData = {
  points: 1250,
  tier: "Gold",
  nextTier: "Platinum",
  pointsToNext: 750,
  totalSpent: 2456.80,
  memberSince: "January 2025",
};

const availableRewards = [
  {
    id: "1",
    name: "Free Classic Fire Bird",
    points: 500,
    description: "Redeem for a free Classic Fire Bird sandwich",
    category: "Food",
  },
  {
    id: "2",
    name: "Free Large Fries",
    points: 250,
    description: "Redeem for free large fries",
    category: "Sides",
  },
  {
    id: "3",
    name: "20% Off Next Order",
    points: 300,
    description: "Get 20% off your next order (max $10)",
    category: "Discount",
  },
  {
    id: "4",
    name: "Free Delivery",
    points: 150,
    description: "Free delivery on your next order",
    category: "Delivery",
  },
  {
    id: "5",
    name: "Free Wings (6pc)",
    points: 600,
    description: "Redeem for free 6-piece wings",
    category: "Food",
  },
  {
    id: "6",
    name: "Double Points Day",
    points: 400,
    description: "Earn double points on your next order",
    category: "Bonus",
  },
];

const recentActivity = [
  { id: "1", type: "earned", points: 45, description: "Order #ORD-001", date: "2026-06-27" },
  { id: "2", type: "earned", points: 32, description: "Order #ORD-002", date: "2026-06-25" },
  { id: "3", type: "redeemed", points: -500, description: "Free Classic Fire Bird", date: "2026-06-23" },
  { id: "4", type: "earned", points: 28, description: "Order #ORD-003", date: "2026-06-20" },
  { id: "5", type: "bonus", points: 100, description: "Welcome Bonus", date: "2025-01-15" },
];

export default function RewardsPage() {
  const progress = ((2000 - rewardsData.pointsToNext) / 2000) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">Rewards</h1>
        <p className="text-muted-foreground">
          Earn points with every order and redeem for rewards
        </p>
      </div>

      {/* Points Card */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Your Points</p>
              <p className="text-4xl font-bold">{rewardsData.points.toLocaleString()}</p>
              <p className="text-sm opacity-90 mt-1">
                {rewardsData.tier} Member
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-sm">{rewardsData.tier}</span>
              </div>
              <p className="text-sm opacity-90 mt-2">
                {rewardsData.pointsToNext} pts to {rewardsData.nextTier}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2 bg-primary-foreground/20" />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{rewardsData.points}</p>
                <p className="text-sm text-muted-foreground">Available Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${rewardsData.totalSpent.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">Member</p>
                <p className="text-sm text-muted-foreground">Since {rewardsData.memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Available Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableRewards.map((reward) => (
              <Card
                key={reward.id}
                className={rewardsData.points >= reward.points ? "" : "opacity-60"}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {reward.description}
                      </p>
                    </div>
                    <Badge variant="outline">{reward.category}</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-bold">{reward.points} pts</span>
                    </div>
                    <Button
                      size="sm"
                      disabled={rewardsData.points < reward.points}
                    >
                      {rewardsData.points >= reward.points
                        ? "Redeem"
                        : "Not enough points"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.type === "earned"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "redeemed"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {activity.type === "earned" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : activity.type === "redeemed" ? (
                      <Gift className="h-4 w-4" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <span
                  className={`font-medium ${
                    activity.points > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {activity.points > 0 ? "+" : ""}
                  {activity.points} pts
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
