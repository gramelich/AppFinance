import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type BalanceProps = {
  balance: number
}

export function Balance({ balance }: BalanceProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Saldo Atual</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          R$ {balance.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  )
}

