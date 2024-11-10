import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Vote,
  Users,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";

// Mock data
const events = [
  {
    id: 1,
    title: "Vote on Marketing Budget",
    type: "vote",
    date: "2024-07-15",
  },
  {
    id: 2,
    title: "Board Member Election",
    type: "election",
    date: "2024-07-20",
  },
  {
    id: 3,
    title: "Monthly Governance Meeting",
    type: "meeting",
    date: "2024-07-25",
  },
  {
    id: 4,
    title: "Q3 Strategy Proposal Deadline",
    type: "deadline",
    date: "2024-07-31",
  },
  {
    id: 5,
    title: "Community AMA Session",
    type: "meeting",
    date: "2024-08-05",
  },
  {
    id: 6,
    title: "Treasury Reallocation Vote",
    type: "vote",
    date: "2024-08-10",
  },
];

export default function UserCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Filter events when selected date changes
  useEffect(() => {
    if (selectedDate) {
      const filtered = events.filter(
        (event) =>
          new Date(event.date).toDateString() === selectedDate.toDateString()
      );
      setFilteredEvents(filtered);
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative">
      <div className="absolute inset-0 bg-[#0F0B15]/80 pointer-events-none" />
      <div className="relative">
        <div className="container mx-auto p-8 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              Governance Calendar
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-purple-100">
                  <CalendarIcon className="mr-2 h-6 w-6 text-purple-400" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-purple-500/20"
                />
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-purple-100">
                  <FileText className="mr-2 h-6 w-6 text-purple-400" />
                  Upcoming Events
                </CardTitle>
                <CardDescription className="text-purple-300">
                  {selectedDate
                    ? `Events for ${selectedDate.toDateString()}`
                    : "Select a date to view events"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <div key={event.id} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                          <div>
                            <h3 className="font-semibold text-purple-100">
                              {event.title}
                            </h3>
                            <p className="text-sm text-purple-300 mt-1">
                              {event.date}
                            </p>
                          </div>
                          <Badge
                            className={
                              event.type === "vote"
                                ? "bg-green-500/20 text-green-300"
                                : event.type === "election"
                                ? "bg-blue-500/20 text-blue-300"
                                : event.type === "meeting"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-red-500/20 text-red-300"
                            }
                          >
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
                          </Badge>
                        </div>
                        <Separator className="my-4 bg-purple-500/20" />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-purple-300">
                      No events scheduled for this date.
                    </p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center text-purple-100">
                <Vote className="mr-2 h-6 w-6 text-purple-400" />
                Upcoming Votes and Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-purple-100 mb-2">
                    Next Votes
                  </h3>
                  <ul className="space-y-2">
                    {events
                      .filter((e) => e.type === "vote")
                      .slice(0, 3)
                      .map((vote) => (
                        <li
                          key={vote.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-purple-300">{vote.title}</span>
                          <Badge className="bg-green-500/20 text-green-300">
                            {vote.date}
                          </Badge>
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-100 mb-2">
                    Upcoming Deadlines
                  </h3>
                  <ul className="space-y-2">
                    {events
                      .filter((e) => e.type === "deadline")
                      .slice(0, 3)
                      .map((deadline) => (
                        <li
                          key={deadline.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-purple-300">
                            {deadline.title}
                          </span>
                          <Badge className="bg-red-500/20 text-red-300">
                            {deadline.date}
                          </Badge>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
