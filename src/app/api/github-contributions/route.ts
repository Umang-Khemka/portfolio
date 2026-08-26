import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Umang-Khemka";

export async function GET() {
  try {
    const now = new Date();

    // Today
    const to = now.toISOString();

    // Exactly 7 months before today
    const fromDate = new Date(now);
    fromDate.setMonth(fromDate.getMonth() - 7);

    const from = fromDate.toISOString();

    const query = `
      query(
        $userName: String!
        $from: DateTime!
        $to: DateTime!
      ) {
        user(login: $userName) {
          contributionsCollection(
            from: $from
            to: $to
          ) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          userName: GITHUB_USERNAME,
          from,
          to,
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message ?? "GraphQL error");
    }

    const weeks =
      json.data.user.contributionsCollection.contributionCalendar.weeks;

    const days = weeks.flatMap(
      (w: {
        contributionDays: {
          date: string;
          contributionCount: number;
        }[];
      }) => w.contributionDays
    );

    return NextResponse.json({ days });
  } catch (err) {
    console.error("GitHub contributions fetch failed:", err);

    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}