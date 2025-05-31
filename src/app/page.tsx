"use client";

import { useState } from 'react';
import { generateRecipe, type GenerateRecipeOutput, type GenerateRecipeInput } from '@/ai/flows/generate-recipe';
import { AppHeader } from '@/components/layout/app-header';
import { RecipeForm } from '@/components/recipe/recipe-form';
import { RecipeDisplay } from '@/components/recipe/recipe-display';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateRecipe = async (data: GenerateRecipeInput) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null); // Clear previous recipe
    try {
      const result = await generateRecipe(data);
      if (result && result.recipeName) {
        setRecipe(result);
        toast({
          title: "Receita Gerada!",
          description: `Sua receita para ${result.recipeName} está pronta.`,
        });
      } else {
        throw new Error("A IA não conseguiu gerar uma receita válida. Tente um nome de prato diferente ou mais específico.");
      }
    } catch (e: any) {
      const errorMessage = e.message || "Ocorreu um erro ao gerar a receita. Tente novamente.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erro ao Gerar Receita",
        description: errorMessage,
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-headline font-bold text-foreground mb-2">
            Descubra Sabores Incríveis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Digite o nome de um prato e deixe nossa inteligência artificial criar uma receita deliciosa para você, com ingredientes e passo a passo.
          </p>
        </div>
        
        <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />

        {error && (
          <Alert variant="destructive" className="mt-8 max-w-lg mx-auto">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Ops! Algo deu errado</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recipe && (
          <div className="mt-12 max-w-2xl mx-auto">
            <RecipeDisplay recipe={recipe} />
          </div>
        )}
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t border-border mt-12">
        <p>&copy; {new Date().getFullYear()} Chef IA. Todos os direitos reservados.</p>
        <p>Desenvolvido por: Pedro Henrique Natividade Pinto Email - pedronatividade0404@gmail.com</p>
      </footer>
    </div>
  );
}
