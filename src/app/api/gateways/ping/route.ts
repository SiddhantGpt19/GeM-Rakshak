import { NextResponse } from "next/server";
import { mockGateways } from "@/data/mockGateways";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetId = searchParams.get("id");

  // Simulate network latency (between 60ms and 190ms)
  const simulatedDelay = Math.floor(Math.random() * 80) + 70;
  await new Promise((resolve) => setTimeout(resolve, simulatedDelay));

  const timestamp = new Date().toISOString();

  if (targetId) {
    const gw = mockGateways.find((g) => g.id === targetId);
    if (!gw) {
      return NextResponse.json(
        { error: "Gateway ID not found", timestamp },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      gateway: {
        ...gw,
        latency_ms: simulatedDelay,
        last_sync: "Just now",
      },
      timestamp,
      server: "GeM-Rakshak Gateway Proxy Middleware (CPCL Node-01)",
    });
  }

  // Ping all gateways with fresh jittered latencies
  const updatedGateways = mockGateways.map((gw) => {
    const jitter = Math.floor(Math.random() * 40) - 20;
    const latency = Math.max(45, gw.latency_ms + jitter);
    return {
      ...gw,
      latency_ms: latency,
      last_sync: "Just now",
      status: "OPERATIONAL" as const,
    };
  });

  return NextResponse.json({
    success: true,
    total_gateways: updatedGateways.length,
    operational_count: updatedGateways.length,
    overall_health: "100% HEALTHY",
    average_latency_ms: Math.round(
      updatedGateways.reduce((acc, g) => acc + g.latency_ms, 0) /
        updatedGateways.length
    ),
    timestamp,
    gateways: updatedGateways,
    server: "GeM-Rakshak Gateway Proxy Middleware (CPCL Node-01)",
  });
}

export async function POST() {
  return GET(new Request("http://localhost:3000/api/gateways/ping"));
}
