import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideScreenshot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {guideImage} from '../utils/guideImages'

export const classesSection: GuideSection = {
  id: 'classes',
  title: 'Classes',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        <strong>Classes</strong> are the heart of the site. Each Class document is the source of truth
        for a training offering — copy, images, pricing, schedules, and booking. Page sections such as{' '}
        <strong>Programs Grid</strong> and <strong>Class Rows</strong> only choose which classes to
        display; they do not store the program content itself.
      </GuideParagraph>

      <GuideScreenshot
        src={guideImage('classComponent.png')}
        alt="Example of class content rendered on the website from a Class document"
        caption="What visitors see on a class page comes from the Class document."
      />

      <Stack space={4}>
        <GuideSubheading>Three tabs in each Class</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Content</strong> — class name, slug, training type (Group, Private, or On
              Demand), price, description, key takeaways, and optional parent page for URL structure
            </>,
            <>
              <strong>Acuity / Scheduling</strong> — upcoming sessions, booking links, and seat counts
              (see below)
            </>,
            <>
              <strong>Display</strong> — photos, card image for grids, enhanced card title, and card
              bullet points for the homepage programs grid
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Training types</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Group</strong> — shows upcoming session dates with Acuity booking buttons and
              optional category booking link for “view all classes in this category”
            </>,
            <>
              <strong>Private</strong> — class page content without the group booking schedule UI
            </>,
            <>
              <strong>On Demand</strong> — content-only; no live session list on the class page
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Upcoming sessions (Group classes)</GuideSubheading>
        <GuideParagraph>
          Under <strong>Acuity / Scheduling → Upcoming Classes</strong>, add one entry per session you
          want advertised on the site (up to 8). For each session:
        </GuideParagraph>
        <GuideSteps
          steps={[
            <>
              Set <strong>Date and Time</strong> — this is the date shown beside the booking button.
            </>,
            <>
              In Acuity, open the appointment type for this session and copy the <strong>Direct Link</strong>{' '}
              or <strong>Booking Button Code</strong> snippet. Paste it into the{' '}
              <strong>Acuity Appointment Type ID</strong> field in Studio — the ID is extracted
              automatically.
            </>,
            <>
              Enter <strong>Total Spots</strong> for how many seats that session offers.
            </>,
            <>
              <strong>Publish</strong> the Class when you are ready for changes to appear on the site.
            </>,
          ]}
        />
        <GuideScreenshot
          src={guideImage('acuityAppointmentDetails.png')}
          alt="Acuity appointment type screen showing where to copy the direct link or booking button code"
          caption="In Acuity: open the appointment type for the session, then copy the Direct Link or Booking Button Code."
        />
        <GuideParagraph>
          On the live site, each session shows a booking button labelled{' '}
          <strong>REGISTER NOW</strong> (green) or <strong>FULL</strong> (red) when no spots remain.
          Visitors click the button to book through Acuity — you do not manage individual registrations
          inside Sanity.
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Category booking link (Group classes)</GuideSubheading>
        <GuideParagraph>
          <strong>Acuity Category Booking URL</strong> is for the orange “view all classes” style button
          on program cards (enhanced grid). In Acuity go to{' '}
          <strong>Scheduling Page → Link → Direct Links &amp; Embedding</strong>, choose an{' '}
          <strong>Appointment Type Category</strong>, and paste the embed snippet into Studio — the URL
          is extracted automatically. This is separate from individual session buttons — it opens
          Acuity’s category view for that program family.
        </GuideParagraph>
        <GuideScreenshot
          src={guideImage('acuityURL.png')}
          alt="Acuity Scheduling Page link settings for Direct Links and Embedding"
          caption="Acuity: Scheduling Page → Link → Direct Links &amp; Embedding — use Appointment Type Categories for the category booking URL."
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Acuity Form page block</GuideSubheading>
        <GuideParagraph>
          Some pages (for example Contact) use an <strong>Acuity Form</strong> block inside a{' '}
          <strong>Multi Column Row</strong>. That embeds Acuity’s full scheduling widget on the page —
          it is not tied to a single Class document. Use it when you want a general booking area rather
          than session-specific buttons on a class page.
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>How seat counts stay in sync</GuideSubheading>
        <GuideParagraph>
          Each upcoming session tracks <strong>Bookings Count</strong> against <strong>Total Spots</strong>.
          When someone registers or cancels in Acuity, the website is set up to update those numbers
          automatically so availability badges stay accurate without manual work.
        </GuideParagraph>
        <GuideParagraph>
          <strong>Availability</strong> (Open, Nearly Full, or Full) is calculated from those numbers.
          You can change it manually if needed — useful when something looks off on the site.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="caution" title="Good to know — seat counts">
        <Stack space={3}>
          <GuideParagraph>
            This automatic updating worked reliably in testing. In production, occasional hiccups can
            happen — for example a session still showing <strong>FULL</strong> when you know spots are
            open, or the count not matching what you see in Acuity.
          </GuideParagraph>
          <GuideParagraph>
            <strong>You can fix it in Studio:</strong> open the Class → <strong>Acuity / Scheduling</strong>{' '}
            → find the session → adjust <strong>Bookings Count</strong> and <strong>Availability</strong>{' '}
            to match reality, then publish. No technical knowledge required.
          </GuideParagraph>
          <GuideParagraph>
            Behind the scenes, Acuity notifies the website when appointments are scheduled or canceled.
            If seat counts keep drifting wrong, contact your developer — that is not something to
            troubleshoot day to day as an editor.
          </GuideParagraph>
        </Stack>
      </GuideCallout>

      <GuideCallout tone="positive" title="Tip">
        Publish Class documents before expecting them in Programs Grid, Class Rows, or class detail
        pages. If a new session does not appear, check that the Class is published and the session has
        a date, Acuity ID, and total spots filled in.
      </GuideCallout>
    </Stack>
  ),
}
