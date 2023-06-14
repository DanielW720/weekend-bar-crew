import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return <div>{`Here's the route: app/${params.id}`}</div>;
}
