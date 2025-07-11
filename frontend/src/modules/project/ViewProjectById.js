
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectById,
  changeProjectStatus,
  resetSuccessMessage,
} from "@/store/features/in-project/projectSlice";
import {
  FiArrowLeft,
  FiDownload,
  FiPlus,
  FiUsers,
  FiList,
  FiFileText,
  FiInfo,
  FiCalendar,
  FiUser,
  FiEdit,
  FiPaperclip,
} from "react-icons/fi";
import { Briefcase, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import ViewTeamByProjectId from "@/modules/team/viewTeamByProjectId";
import CreateTeamForm from "@/modules/team/createTeam";
import AllTaskListByProjectId from "@/modules/task/AllTaskListByProjectId";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function ViewProjectById({ projectId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { project, status, error, successMessage } = useSelector(
    (state) => state.project
  );
  const [activeTab, setActiveTab] = useState("details");
  const [newStatus, setNewStatus] = useState("");
  const [statusUpdateMessage, setStatusUpdateMessage] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasFetchedAfterStatusChange, setHasFetchedAfterStatusChange] =
    useState(false);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  const { currentUser, isTeamLead } = useCurrentUser(project?.data?.teamLeadId);
  console.log("isTeamLead", isTeamLead);
  console.log("currentUser:", currentUser);

  useEffect(() => {
    if (successMessage && !hasFetchedAfterStatusChange) {
      setStatusUpdateMessage(successMessage);
      setHasFetchedAfterStatusChange(true);
      dispatch(fetchProjectById(projectId));
      setNewStatus("");
      setTimeout(() => {
        setStatusUpdateMessage("");
        dispatch(resetSuccessMessage());
        setHasFetchedAfterStatusChange(false);
      }, 3000);
    }
    if (error.statusChange) {
      setStatusUpdateMessage(error.statusChange);
      setTimeout(() => setStatusUpdateMessage(""), 3000);
    }
  }, [
    successMessage,
    error.statusChange,
    dispatch,
    projectId,
    hasFetchedAfterStatusChange,
  ]);

  const handleDownload = (url, filename) => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  const handleStatusSubmit = () => {
    if (newStatus) {
      setIsStatusModalOpen(false);
      setIsConfirmModalOpen(true);
    }
  };

  const handleConfirmStatusChange = () => {
    if (newStatus && projectId) {
      dispatch(changeProjectStatus({ projectId, status: newStatus }));
      setIsConfirmModalOpen(false);
      toast.success("Status Updated!");
    }
  };

  const statusOptions = ["In Progress", "Completed", "Cancelled", "Planned"];

  // Define tabs array
  const tabs = [
    {
      id: "details",
      label: "Details",
      icon: <FiInfo className="h-5 w-5" />,
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: <FiList className="h-5 w-5" />,
    },
    {
      id: "team",
      label: "Team",
      icon: <FiUsers className="h-5 w-5" />,
    },
  ];

  // Determine if tasks and team tabs should be disabled
  const isTasksTeamDisabled = currentUser?.role !== "cpc" && !isTeamLead;

  if (status.fetchProject === "loading") {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-t-3 border-blue-600 mx-auto mb-6"></div>
          <p className="text-blue-700 font-medium text-lg">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (status.fetchProject === "failed") {
    return (
      <div className="container mx-auto px-4">
        <Card className="border border-red-200 shadow-lg mx-auto max-w-2xl">
          <CardContent className="p-6">
            <p className="font-semibold text-lg text-red-700 mb-2">
              Unable to load project
            </p>
            <p className="text-red-600 text-sm mb-4">
              {error.fetchProject ||
                "An error occurred while loading the project."}
            </p>
            <Button
              onClick={() => dispatch(fetchProjectById(projectId))}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project || !project.data) return null;

  return (
    <div className="min-h-screen">
      <Card className="shadow-xl border border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="border-blue-500 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold"
                aria-label="Go back"
              >
                <FiArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
                Back
              </Button>
              <CardTitle className="text-2xl font-bold text-blue-700">
                {project.data.projectName || "Unnamed Project"}
              </CardTitle>
            </div>
            {statusUpdateMessage && (
              <p
                className={`text-sm ${
                  successMessage ? "text-blue-600" : "text-red-600"
                }`}
              >
                {statusUpdateMessage}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="p-1 bg-gray-100 rounded-full flex flex-wrap justify-center sm:justify-start gap-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  disabled={tab.id !== "details" && isTasksTeamDisabled}
                  className={`flex items-center gap-2 rounded-full py-2 px-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-blue-100"
                  } ${tab.id !== "details" && isTasksTeamDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label={`View ${tab.label} tab`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="details">
              <div className="space-y-6">
                {/* Project Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FiInfo className="h-5 w-5 text-blue-600" />
                      Project Details
                    </h3>
                    {currentUser?.role === "cpc" && (
                      <Button
                        size="sm"
                        onClick={() => router.push(`/project/edit/${projectId}`)}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        aria-label="Edit project"
                      >
                        <FiEdit className="h-5 w-5 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                      <span className="font-bold text-gray-700 w-28">
                        Project ID:
                      </span>
                      <span>{project.data.projectId}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiPaperclip className="h-5 w-5 text-gray-400" />
                      <span className="font-bold text-gray-700 w-28">
                        Category:
                      </span>
                      <span>{project.data.category || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiUser className="h-5 w-5 text-gray-400" />
                      <span className="font-bold text-gray-700 w-28">
                        Client ID:
                      </span>
                      <span>{project.data.clientId || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                      <span className="font-bold text-gray-700 w-28">
                        Status:
                      </span>
                      <Badge
                        onClick={() => {
                          if (currentUser?.role === "cpc") {
                            setIsStatusModalOpen(true);
                          }
                        }}
                        className={`cursor-pointer px-3 py-1 text-sm font-medium ${
                          project.data.status === "Completed"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : project.data.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : project.data.status === "Cancelled"
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                        aria-label={`Change status from ${project.data.status}`}
                      >
                        {project.data.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiUser className="h-5 w-5 text-gray-400" />
                      <span className="font-bold text-gray-700 w-28">
                        Team Lead:
                      </span>
                      <span>{project.data.teamLeadName || "Unassigned"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                      <span className="font-bold text-gray-700 w-28">
                        Created At:
                      </span>
                      <span>
                        {project.data.createdAt
                          ? new Date(project.data.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline & Attachments */}
                {(project.data.startDate ||
                  project.data.endDate ||
                  project.data.attachments?.length > 0) && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FiCalendar className="h-5 w-5 text-blue-600" />
                      Timeline & Attachments
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                      {project.data.startDate && (
                        <div className="flex items-center gap-3">
                          <FiCalendar className="h-5 w-5 text-gray-400" />
                          <span className="font-bold text-gray-700 w-28">
                            Start Date:
                          </span>
                          <span>
                            {new Date(project.data.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {project.data.endDate && (
                        <div className="flex items-center gap-3">
                          <FiCalendar className="h-5 w-5 text-gray-400" />
                          <span className="font-bold text-gray-700 w-28">
                            End Date:
                          </span>
                          <span>
                            {new Date(project.data.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    {project.data.attachments?.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-gray-700">
                          Attachments:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.data.attachments.map((attachment, index) => (
                            <Button
                              key={index}
                              onClick={() =>
                                handleDownload(attachment.url, attachment.filename)
                              }
                              disabled={isDownloading}
                              variant="outline"
                              className="flex items-center gap-2 w-full justify-start text-left border-gray-200 hover:bg-blue-50"
                              aria-label={`Download ${attachment.filename}`}
                            >
                              <FiDownload className="h-5 w-5 text-blue-600" />
                              <span className="text-gray-700 truncate">
                                {attachment.filename}
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FiFileText className="h-5 w-5 text-blue-600" />
                    Description
                  </h3>
                  {project.data.description ? (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.data.description}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No description available
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <div className="space-y-4">
                <AllTaskListByProjectId
                  project={project.data}
                  projectId={project.data.projectId}
                />
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FiUsers className="h-5 w-5 text-blue-600" />
                    Team
                  </h3>
                  <Button
                    size="sm"
                    onClick={() => setShowTeamForm(true)}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    aria-label="Create new team"
                  >
                    <FiPlus className="h-5 w-5 mr-2" />
                    Create Team
                  </Button>
                </div>
                {showTeamForm ? (
                  project &&
                  project.data && (
                    <CreateTeamForm
                      projectDetails={{
                        id: project.data.projectId,
                        name: project.data.projectName,
                        teamLead: {
                          id: project.data.teamLeadId,
                          name: project.data.teamLeadName,
                        },
                        teamMembers: [],
                      }}
                      onSuccess={() => setShowTeamForm(false)}
                    />
                  )
                ) : (
                  <ViewTeamByProjectId projectId={projectId} />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Status Update Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="bg-white rounded-lg shadow-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Update Project Status
            </DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select New Status
            </label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="border-gray-200 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions
                  .filter((status) => status !== project.data.status)
                  .map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusModalOpen(false)}
              className="text-gray-600 border-gray-300 hover:bg-gray-100"
              aria-label="Cancel status update"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusSubmit}
              disabled={!newStatus}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="bg-white rounded-lg shadow-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Confirm Status Change
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to change the project status to{" "}
            <span className="font-semibold text-blue-600">{newStatus}</span>?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="text-gray-600 border-gray-300 hover:bg-gray-100"
              aria-label="Cancel status change confirmation"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmStatusChange}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}