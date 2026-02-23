import { Component, Input } from '@angular/core';
import { ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

/**
 * A single calendar event for UiScheduleComponent.
 */
export interface ScheduleEventConfig {
    /** Unique event identifier */
    Id: number | string;
    /** Event title displayed on the calendar */
    Subject: string;
    /** Event start date/time */
    StartTime: Date;
    /** Event end date/time */
    EndTime: Date;
    /** Whether the event spans the full day */
    IsAllDay?: boolean;
    /** Optional hex colour for the event block */
    CategoryColor?: string;
    /** Any additional custom fields */
    [key: string]: unknown;
}

/**
 * View type for the schedule.
 */
export type ScheduleView =
    | 'Day'
    | 'Week'
    | 'WorkWeek'
    | 'Month'
    | 'Agenda'
    | 'MonthAgenda'
    | 'TimelineDay'
    | 'TimelineWeek'
    | 'TimelineWorkWeek'
    | 'TimelineMonth';

/**
 * Top-level configuration object for UiScheduleComponent.
 */
export interface ScheduleConfig {
    /** Views to display in the toolbar (default: Day, Week, WorkWeek, Month, Agenda) */
    views?: ScheduleView[];
    /** Initially selected date (default: today) */
    selectedDate?: Date;
    /** Calendar events */
    events?: ScheduleEventConfig[];
    /** Component height (CSS string, default: '550px') */
    height?: string;
    /** Work day start time in 'HH:mm' format (default: '08:00') */
    startHour?: string;
    /** Work day end time in 'HH:mm' format (default: '18:00') */
    endHour?: string;
    /** First day of the week: 0 = Sunday, 1 = Monday (default: 0) */
    firstDayOfWeek?: number;
    /** Show weekend columns/rows (default: true) */
    showWeekend?: boolean;
    /** Active view on load (default: 'Week') */
    currentView?: ScheduleView;
    /** Show/hide the header toolbar */
    showHeaderBar?: boolean;
    /** Show/hide the time indicator line */
    showTimeIndicator?: boolean;
    /** Minimum date selectable */
    minDate?: Date;
    /** Maximum date selectable */
    maxDate?: Date;
    /** Time slot duration in minutes (default: 30) */
    timeScale?: number;
}

/**
 * UiScheduleComponent — a config-driven wrapper around the Syncfusion EJ2 Scheduler.
 *
 * @example
 * <ui-schedule [config]="scheduleConfig"></ui-schedule>
 *
 * scheduleConfig: ScheduleConfig = {
 *   views: ['Day', 'Week', 'Month'],
 *   currentView: 'Week',
 *   selectedDate: new Date(),
 *   startHour: '08:00',
 *   endHour: '18:00',
 *   events: [
 *     {
 *       Id: 1,
 *       Subject: 'Team Standup',
 *       StartTime: new Date(2025, 6, 14, 9, 0),
 *       EndTime:   new Date(2025, 6, 14, 9, 30),
 *     }
 *   ]
 * };
 */
@Component({
    selector: 'ui-schedule',
    standalone: true,
    imports: [ScheduleModule],
    providers: [ DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService ],
    template: `
    <ejs-schedule [height]="config.height ?? '550px'" [selectedDate]="config.selectedDate ?? today" [currentView]="config.currentView ?? 'Week'" [firstDayOfWeek]="config.firstDayOfWeek ?? 0" [showWeekend]="config.showWeekend ?? true" [startHour]="config.startHour ?? '08:00'" [endHour]="config.endHour ?? '18:00'" [showHeaderBar]="config.showHeaderBar ?? true" [showTimeIndicator]="config.showTimeIndicator ?? true" [minDate]="config.minDate" [maxDate]="config.maxDate" [timeScale]="timeScaleSettings" [eventSettings]="eventSettings">
      <e-views>
        @for (view of activeViews; track view) {
          <e-view [option]="view"></e-view>
        }
      </e-views>
    </ejs-schedule>
  `
})
export class UiScheduleComponent {
    /** Schedule configuration object */
    @Input({ required: true }) config!: ScheduleConfig;

    readonly today = new Date();

    readonly defaultViews: ScheduleView[] = ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'];

    get activeViews(): ScheduleView[] {
        return this.config.views ?? this.defaultViews;
    }

    get eventSettings() {
        return { dataSource: this.config.events ?? [] };
    }

    get timeScaleSettings() {
        return { interval: this.config.timeScale ?? 30 };
    }
}