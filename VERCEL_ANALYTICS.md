# Getting started with Vercel Web Analytics

This guide will help you get started with using Vercel Web Analytics on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

Select your framework to view instructions on using the Vercel Web Analytics in your project.

## [Prerequisites](#prerequisites)

*   A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
*   A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
*   The Vercel CLI installed. If you don't have it, you can install it using the following command:
    
    pnpmyarnnpmbun
    
    ```
    pnpm i -g vercel
    ```
    

1.  ### [Enable Web Analytics in Vercel](#enable-web-analytics-in-vercel)
    
    On the [Vercel dashboard](/dashboard), select your Project and then click the Analytics tab and click Enable from the dialog.
    
    [Go to Web Analytics](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics&title=Open+Web+Analytics)
    
    Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.
    
*   ### [Add `@vercel/analytics` to your project](#add-@vercel/analytics-to-your-project)
    
    Using the package manager of your choice, add the `@vercel/analytics` package to your project:
    
    pnpmyarnnpmbun
    
    ```
    pnpm i @vercel/analytics
    ```
    3.  ### [Add the `Analytics` component to your app](#add-the-analytics-component-to-your-app)
    
    The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with Next.js, including route support.
    
    Add the following code to the root layout:
    
    ```
    import { Analytics } from '@vercel/analytics/next';
     
    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <head>
            <title>Next.js</title>
          </head>
          <body>
            {children}
            <Analytics />
          </body>
        </html>
      );
    }
    ```
    
4.  ### [Deploy your app to Vercel](#deploy-your-app-to-vercel)
    
    Deploy your app using the following command:
    
    ```
    vercel deploy
    ```
    
    If you haven't already, we also recommend [connecting your project's Git repository](/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest commits to main without terminal commands.
    
    Once your app is deployed, it will start tracking visitors and page views.
    
    If everything is set up properly, you should be able to see a Fetch/XHR request in your browser's Network tab from `/_vercel/insights/view` when you visit any page.
    
5.  ### [View your data in the dashboard](#view-your-data-in-the-dashboard)
    
    Once your app is deployed, and users have visited your site, you can view your data in the dashboard.
    
    To do so, go to your [dashboard](/dashboard), select your project, and click the Analytics tab.
    
    After a few days of visitors, you'll be able to start exploring your data by viewing and [filtering](/docs/analytics/filtering) the panels.
    
    Users on Pro and Enterprise plans can also add [custom events](/docs/analytics/custom-events) to their data to track user interactions such as button clicks, form submissions, or purchases.
    

Learn more about how Vercel supports [privacy and data compliance standards](/docs/analytics/privacy-policy) with Vercel Web Analytics.

## [Next steps](#next-steps)

Now that you have Vercel Web Analytics set up, you can explore the following topics to learn more:

*   [Learn how to use the `@vercel/analytics` package](/docs/analytics/package)
*   [Learn how to set update custom events](/docs/analytics/custom-events)
*   [Learn about filtering data](/docs/analytics/filtering)
*   [Read about privacy and compliance](/docs/analytics/privacy-policy)
*   [Explore pricing](/docs/analytics/limits-and-pricing)
*   [Troubleshooting](/docs/analytics/troubleshooting)

Last updated on April 9, 2025

---

# Advanced Web Analytics Config with @vercel/analytics

## [Getting started](#getting-started)

To get started with analytics, follow our [Quickstart](/docs/analytics/quickstart) guide which will walk you through the process of setting up analytics for your project.

## [`mode`](#mode)

Override the automatic environment detection.

This option allows you to force a specific environment for the package. If not defined, it will use `auto` which tries to set the `development` or `production` mode based on available environment variables such as `NODE_ENV`.

If your used framework does not expose these environment variables, the automatic detection won't work correctly. In this case, you're able to provide the correct `mode` manually or by other helpers that your framework exposes.

If you're using the `<Analytics />` component, you can pass the `mode` prop to force a specific environment:

```
import { Analytics } from '@vercel/analytics/next';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics mode="production" />;
      </body>
    </html>
  );
}
```

## [`debug`](#debug)

You'll see all analytics events in the browser's console with the debug mode. This option is automatically enabled if the `NODE_ENV` environment variable is available and either `development` or `test`.

You can manually disable it to prevent debug messages in your browsers console.

To disable the debug mode for server-side events, you need to set the `VERCEL_WEB_ANALYTICS_DISABLE_LOGS` environment variable to `true`.

```
import { Analytics } from '@vercel/analytics/next';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics debug={true} />;
      </body>
    </html>
  );
}
```

## [`beforeSend`](#beforesend)

With the `beforeSend` option, you can modify the event data before it's sent to Vercel. Below, you will see an example that ignores all events that have a `/private` inside the URL.

Returning `null` will ignore the event and no data will be sent. You can also modify the URL and check our docs about [redacting sensitive data](/docs/analytics/redacting-sensitive-data).

```
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics
          beforeSend={(event: BeforeSendEvent) => {
            if (event.url.includes('/private')) {
              return null;
            }
            return event;
          }}
        />
      </body>
    </html>
  );
}
```

## [`endpoint`](#endpoint)

The `endpoint` option allows you to report the collected analytics to a different url than the default: `https://yourdomain.com/_vercel/insights`.

This is useful when deploying several projects under the same domain, as it allows you to keep each application isolated.

For example, when `yourdomain.com` is managed outside of Vercel:

1.  "alice-app" is deployed under `yourdomain.com/alice/*`, vercel alias is `alice-app.vercel.sh`
2.  "bob-app" is deployed under `yourdomain.com/bob/*`, vercel alias is `bob-app.vercel.sh`
3.  `yourdomain.com/_vercel/*` is routed to `alice-app.vercel.sh`

Both applications are sending their analytics to `alice-app.vercel.sh`. To restore the isolation, "bob-app" should use:

```
<Analytics endpoint="https://bob-app.vercel.sh/_vercel/insights" />
```

## [`scriptSrc`](#scriptsrc)

The `scriptSrc` option allows you to load the Web Analytics script from a different URL than the default one.

```
<Analytics scriptSrc="https://bob-app.vercel.sh/_vercel/insights/script.js" />
```

Last updated on March 4, 2025