<script lang="ts">
  interface NavigateButtonProps {
    imgSrc: string;
    link: string;
    buttonText: string;
  }

  let props: NavigateButtonProps = $props();
</script>

<a class="link-wrapper" href={props.link}>
  <img src={props.imgSrc} alt="Иконка" />
  {props.buttonText}
</a>

<style>
  .link-wrapper {
    font-size: clamp(0.6875rem, 0.3272rem + 1.3725vw, 1.5625rem);
    display: flex;
    gap: 2px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #d3d3d3;
    color: #000;
    transition: transform 0.5s;
  }

  .link-wrapper:hover {
    transform: scale(1.05);
  }

  @media (max-width: 500px) {
    .link-wrapper {
      width: 90px;
      height: 30px;
      align-items: center;
      gap: 2px;
      padding: 5px 5px;
    }
  }
</style>
