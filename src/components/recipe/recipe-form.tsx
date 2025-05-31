"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { GenerateRecipeInput } from '@/ai/flows/generate-recipe';
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  dishName: z.string().min(1, { message: "Por favor, insira o nome do prato." }),
});

type RecipeFormProps = {
  onSubmit: (data: GenerateRecipeInput) => Promise<void>;
  isLoading: boolean;
};

export function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishName: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-lg mx-auto">
        <FormField
          control={form.control}
          name="dishName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-foreground">Nome do Prato</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Bolo de Chocolate com Morangos" 
                  {...field} 
                  className="text-base py-3 px-4"
                  aria-label="Nome do Prato"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando sua receita...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar Receita
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
