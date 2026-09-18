import { IconBlocks, IconBrandGithub } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { getSeoHead } from "../lib/seo";
import { siteConfig } from "../lib/site-config";

export const Route = createFileRoute("/")({
  head: () =>
    getSeoHead({
      title: siteConfig.name,
      description: siteConfig.description,
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <img src="/logo.svg" alt={siteConfig.name} className="h-12 w-auto sm:h-16" />
        <h1 className="sr-only">{siteConfig.name}</h1>
        <p className="max-w-lg text-base text-muted-foreground">{siteConfig.description}</p>
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link to="/$section" params={{ section: "components" }} />}
          >
            <IconBlocks data-icon="inline-start" />
            Browse
          </Button>
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<a href={siteConfig.repositoryUrl} target="_blank" rel="noopener noreferrer" />}
          >
            <IconBrandGithub data-icon="inline-start" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
