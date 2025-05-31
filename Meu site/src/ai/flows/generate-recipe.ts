'use server';

/**
 * @fileOverview Generates a recipe from a dish name in Portuguese.
 *
 * - generateRecipe - A function that generates a recipe from a dish name.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  dishName: z.string().describe('The name of the dish to generate a recipe for (in Portuguese).'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe (in Portuguese).'),
  ingredients: z.string().describe('A list of ingredients for the recipe (in Portuguese).'),
  preparationSteps: z.string().describe('The preparation steps for the recipe (in Portuguese).'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `Você é um chef de cozinha especialista em criar receitas deliciosas e fáceis de seguir. Crie uma receita detalhada para o prato "{{dishName}}", incluindo uma lista de ingredientes e um passo a passo do modo de preparo. A receita deve ser em Português (Brasil). Seja criativo e considere diferentes variações do prato.

Formato de resposta:
{
  "recipeName": "Nome da Receita",
  "ingredients": "Lista de ingredientes",
  "preparationSteps": "Passo a passo do modo de preparo"
}
`,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
