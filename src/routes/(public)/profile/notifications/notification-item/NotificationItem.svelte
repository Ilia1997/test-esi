<script>
  import { convertDateToUTC } from "$lib/functions/convertDateToUTC.js";
  import { getModal } from "$lib/components/Modal.svelte";
  import ThreeDotsIcon from "$lib/components/icons/ThreeDotsIcon.svelte";
  import { selectedNotification } from "$lib/globalStore";
  import ItemTooltip from "./ItemTooltip.svelte";
  import { t } from "$lib/translations/i18n.js";
  export let objAttributes = {};
  export let readonly = {};

  function showNotificationModal(name, text, action) {
    $selectedNotification.head = name;
    $selectedNotification.body = text;
    $selectedNotification.action = action;
    getModal("notification").open();
  }
  // convert date to UTC
  const date = convertDateToUTC(objAttributes.date);
  let nextDate = `${date.day} ${$t("MONTH_SHORT_" + date.month)} ${date.year}`;
</script>

<li
  class="notifications__item box_shadow-medium mt-1_25 b-radius-8 relative {objAttributes.viewed
    ? ''
    : 'unreaded'}"
>
  <div class="d-flex justify-sb">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="title d-flex align-center text-3 mb-1"
      on:click={() =>
        showNotificationModal(
          objAttributes.name,
          objAttributes.text,
          objAttributes.action
        )}
    >
      {objAttributes.name}
    </div>
    {#if !readonly}
      <div class="relative dots">
        <ItemTooltip
          id={objAttributes.idobject}
          status={objAttributes.viewed}
          width={240}><ThreeDotsIcon bgColor="green" /></ItemTooltip
        >
      </div>
    {/if}
  </div>
  <div class="d-flex justify-sb text-5">
    <div class="description">
      {objAttributes.text}
    </div>
    <div class="date">{nextDate}</div>
  </div>
</li>

<style>
  .notifications__item .title:hover {
    cursor: pointer;
    opacity: 0.5;
  }
  .notifications__item .title,
  .notifications__item .description,
  .notifications__item .date {
    color: var(--black);
  }
  .notifications__item.muted .title,
  .notifications__item.muted .description,
  .notifications__item.muted .date {
    color: #838383;
  }
  .notifications__item .title::after {
    content: " ";
    background: var(--grey-color);
    width: 4px;
    height: 4px;
    display: block;
    border-radius: 50%;
    margin-left: 8px;
  }
  .notifications__item.unreaded .title::after {
    background: var(--red-color);
  }
  .notifications__item {
    color: #838383;
    padding: 24px 32px;
    background-color: var(--white);
    margin-bottom: 10px;
  }
  .date {
    margin-top: auto;
    margin-bottom: 0;
    font-weight: var(--font-weight-normal);
  }
  .description {
    max-width: 608px;
    font-weight: var(--font-weight-normal);
  }
  .dots {
    cursor: pointer;
  }
  @media only screen and (max-width: 991px) {
    .notifications__item {
      padding: 72px 1rem 40px 1rem;
    }
    .date {
      position: absolute;
      top: 2rem;
      left: 1rem;
    }
    .dots {
      position: absolute;
      top: 2rem;
      left: auto;
      right: 1rem;
    }
  }
</style>
