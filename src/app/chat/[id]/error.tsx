'use client';

import NextError from 'next/error';

type ErrorPageProps = {
  error: { digest?: string } & Error;
  reset: () => void;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return <NextError statusCode={400} title={error.message} />;
}
