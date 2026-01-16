# 🛍️ E-commerce Frontend (Clean & Performant UI)

Interface moderna, responsiva e de alta performance para o E-commerce White Label.  
Construída com foco em **experiência do usuário**, **acessibilidade**, **SEO** e integração perfeita com a API backend.

Desenvolvida para ser agnóstica ao nicho (velas, roupas, eletrônicos, etc.), com design system flexível e componentes reutilizáveis.

## 🚀 Tecnologias & Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Linguagem:** TypeScript
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) + Shadcn/ui
- **Gerenciamento de Estado (global):** [Zustand](https://zustand-demo.pmnd.rs/) (leve e simples)
- **Validação de Formulários:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Fetching de dados:** [TanStack Query](https://tanstack.com/query/latest) (v5+)
- **UI Components:** Shadcn/ui + Radix UI primitives
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Autenticação:** JWT (integrado com httpOnly cookies / next-auth opcional)
- **Deploy preferencial:** Vercel

## 🏛️ Arquitetura

Seguimos uma organização por **features** + camadas limpas, facilitando escalabilidade e manutenção:

- **/app** → Rotas (App Router do Next.js)
- **/components** → Componentes atômicos e reutilizáveis (ui/, layout/, etc.)
- **/features** → Features/domínios (cart/, products/, orders/, auth/, etc.)
- **/lib** → Utilitários, hooks, api client, config
- **/hooks** → Hooks customizados (useCart, useAuth, etc.)
- **/stores** → Zustand stores
- **/types** → Tipagens globais (DTOs da API, entidades compartilhadas)

## ✨ Funcionalidades Principais

### 🔐 Autenticação & Perfil

- Login / Cadastro / Recuperação de senha
- Área do cliente (meus pedidos, endereço padrão, etc.)
- Proteção de rotas privadas (middleware)

### 🏪 Catálogo & Busca

- Listagem de produtos com filtros e ordenação
- Busca full-text + autocomplete
- Páginas de categoria e produto detalhado
- Imagens otimizadas (Next/Image + Cloudflare R2)

### 🛒 Carrinho & Checkout

- Carrinho persistente (localStorage + sincronia com API)
- Adicionar/remover/atualizar quantidade
- Cálculo em tempo real de subtotal, frete e total
- Fluxo de checkout multi-etapa (endereço → pagamento → confirmação)

### 📱 Responsividade & UX

- Mobile-first com Tailwind
- Modo dark/light automático
- Animações sutis (framer-motion em alguns pontos)
- Acessibilidade (ARIA, keyboard navigation, contraste)

### ⚡ Performance & SEO

- Server Components & Streaming
- Static Rendering + ISR em páginas de produto/categoria
- Metadata dinâmica por página
- Otimização de imagens e fontes

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- Node.js v20+ (recomendado)
- pnpm (ou npm/yarn)

```bash
# 1. Clone o repositório
git clone https://github.com/AndreDevFront/ecommerce-frontend.git
cd ecommerce-frontend

# 2. Instale as dependências
pnpm install

# 3. Crie o arquivo .env.local e configure as variáveis
# Veja .env.example

# 4. Inicie o servidor de desenvolvimento
pnpm dev
```
