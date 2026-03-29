"use client";

import { useExam } from "../hooks/useExam";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ExamContent from "./ExamContent";
import GlobalError from "@/components/shared/globalerror";

export default function ExamManager() {
  const { id } = useParams() as { id: string };
  const { data: examData, isLoading, error } = useExam(id);

  if(error) return <GlobalError error={error}/>
  if (isLoading) return <LoadingSpinner />;
  

  const exam = examData?.data;
  if (!exam) return <div>Exam not found</div>;

  return <ExamContent key={id} exam={exam} id={id} />;
}
