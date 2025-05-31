import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Salad, ListOrdered } from 'lucide-react';

type RecipeDisplayProps = {
  recipe: GenerateRecipeOutput;
};

function formatTextToList(text: string | undefined): string[] {
  if (!text) return [];
  return text.split('\n').map(item => item.trim()).filter(item => item.length > 0);
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const ingredientsList = formatTextToList(recipe.ingredients);
  const preparationStepsList = formatTextToList(recipe.preparationSteps);

  return (
    <Card className="w-full shadow-xl mt-12">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline text-primary">{recipe.recipeName}</CardTitle>
        <CardDescription className="text-muted-foreground text-md pt-1">Sua deliciosa receita gerada por IA!</CardDescription>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="pt-6 space-y-8">
        <div>
          <h3 className="text-2xl font-headline font-semibold mb-4 flex items-center">
            <Salad className="h-6 w-6 mr-2 text-primary" />
            Ingredientes
          </h3>
          {ingredientsList.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-foreground/90 pl-2">
              {ingredientsList.map((ingredient, index) => (
                <li key={index} className="text-base leading-relaxed">{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Nenhum ingrediente listado.</p>
          )}
        </div>
        <Separator />
        <div>
          <h3 className="text-2xl font-headline font-semibold mb-4 flex items-center">
            <ListOrdered className="h-6 w-6 mr-2 text-primary" />
            Modo de Preparo
          </h3>
          {preparationStepsList.length > 0 ? (
          <ol className="list-decimal list-inside space-y-3 text-foreground/90 pl-2">
            {preparationStepsList.map((step, index) => (
              <li key={index} className="text-base leading-relaxed">{step}</li>
            ))}
          </ol>
          ) : (
             <p className="text-muted-foreground">Nenhum passo de preparo listado.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
