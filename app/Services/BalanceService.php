<?php

namespace App\Services;

use App\Model\Balance;
use App\Model\Order;
use App\Model\Product;
use App\User;

class BalanceService
{

    private function createBalance(array $balanceData): void
    {
        Balance::create($balanceData);
    }

    public function addUserBalance(User $user, int $quantity): void
    {
        for ($i = 0; $i < $quantity; ++$i) {
            $this->createBalance([
                'user_id' => $user->id,
                'status' => Balance::STATUS_AVAILABLE,
            ]);
        }
    }

    public function syncUserAndBalance(Product $product, Order $order): ?Balance
    {
        $balance = Balance::where('user_id', '=', $order->user->id)
            ->where('status', '=', Balance::STATUS_AVAILABLE)
            ->orderBy('id', 'asc')
            ->first();

        if ($balance instanceof Balance) {
            $balance->product_id = $product->id;
            $balance->order_id = $order->id;
            $balance->status = Balance::STATUS_SPENT;
            $balance->save();
        } else {
            $this->createBalance([
                'product_id' => $product->id,
                'order_id' => $order->id,
                'user_id' => $order->user->id,
                'status' => Balance::STATUS_DEBT,
            ]);
        }
        return $balance;
    }
}
