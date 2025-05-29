<script lang="ts">
  interface NavigateButtonProps {
    imgSrc: string;
    link: string;
    buttonText: string;
  }

  let props: NavigateButtonProps = $props();
</script>

<a class="link-wrapper" href={props.link}>
  <img src={props.imgSrc} alt="Иконка">
  {props.buttonText}
</a>

<style>
  .link-wrapper {
    display: flex;
    gap: 5px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #d3d3d3;
    color: #000;
    transition: transform 0.5s;
  }

  .link-wrapper:hover {
    transform: scale(1.05);
  }
</style>
