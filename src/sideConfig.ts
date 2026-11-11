export type Side = "groom" | "bride" | "combined";

export interface VenueData {
  name: string;
  address: string;
  coords: string;
  details: string[];
  oldAddress?: string;
}

export interface EventData {
  /** Display name shown in the details card (e.g., "Lễ Thành Hôn", "Tiệc Cưới"). */
  name: string;
  /** Day of month in May 2026 — used by WeddingCalendar to highlight cells. */
  day: number;
  /** Short weekday label rendered next to the time (e.g., "T7", "CN"). */
  weekday: string;
  /** Vietnamese long form for the calendar caption (e.g., "Thứ Hai, 16.11.2026"). */
  dateLabel: string;
  /** Start time as displayed (e.g., "16:00 chiều"). */
  time: string;
}

export interface SideData {
  /** First line of Hero — e.g. "LỄ THÀNH HÔN" / "LỄ VU QUY" */
  invitationFrom: string;
  /** Chronological events this side's guests are invited to. */
  events: EventData[];
  venue: VenueData;
  groomBrideNames: string[];
}

export const SIDE_CONFIG: Record<Side, SideData> = {
  groom: {
    invitationFrom: "LỄ THÀNH HÔN",
    events: [
      {
        name: "Lễ Thành Hôn",
        day: 17,
        weekday: "T3",
        dateLabel: "Thứ Ba, 17.11.2026",
        time: "11:00 sáng",
      },
      {
        name: "Tiệc Mừng",
        day: 17,
        weekday: "T3",
        dateLabel: "Thứ Ba, 17.11.2026",
        time: "11:30 sáng",
      },
    ],
    venue: {
      name: "Tư gia Nhà Trai",
      address: "Trường THCS Trường Sơn, Trường Sơn, Bắc Ninh",
      oldAddress: "Bắc Giang cũ",
      coords: "21.2409791,106.5760376",
      details: [],
    },
    groomBrideNames: ["Quốc Trọng", "Lan Anh"],
  },
  bride: {
    invitationFrom: "LỄ VU QUY",
    events: [
      {
        name: "Lễ Vu Quy",
        day: 17,
        weekday: "T3",
        dateLabel: "Thứ Ba, 17.11.2026",
        time: "10:00 sáng",
      },
    ],
    venue: {
      name: "Tư gia Nhà Gái",
      address: "TL293, Gần trường Mầm Non",
      oldAddress: "Thôn Ao Vè, Trường Sơn, Bắc Ninh",
      coords: "21.2829276,106.5550390",
      details: [],
    },
    groomBrideNames: ["Lan Anh", "Quốc Trọng"],
  },
  combined: {
    invitationFrom: "Trân trọng kính mời bạn đến tham dự lễ cưới của chúng tôi",
    events: [
      {
        name: "Lễ Thành Hôn",
        day: 17,
        weekday: "T3",
        dateLabel: "Thứ Ba, 17.11.2026",
        time: "10:00 sáng",
      },
      {
        name: "Tiệc Mừng",
        day: 17,
        weekday: "T3",
        dateLabel: "Thứ Ba, 17.11.2026",
        time: "11:30 sáng",
      },
    ],
    venue: {
      name: "Tại gia đình chúng tôi",
      address: "Xóm Chẽ, Trường Sơn, Lục Nam, Bắc Ninh",
      coords: "21.2409791,106.5760376",
      details: [],
    },
    groomBrideNames: ["Quốc Trọng", "Lan Anh"],
  },
};
