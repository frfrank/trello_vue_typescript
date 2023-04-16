<template>
  <div class="Menu">
    <nav>
      <RouterLink to="/">Login</RouterLink>
      <RouterLink to="/components">
        <icon
          icon="fa-solid fa-shapes"
          pull="left"
        />

        Components
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.Menu {
  nav {
    display: grid;
    gap: $spacing-m;
    padding: $spacing-m;

    a {
      text-decoration: none;
      all: unset;
      font-weight: 600;
      color: $color-secondary;
      transition: $transition-m;

      &:hover {
        cursor: pointer;
        color: $color-primary-dark;
      }
    }

    a.router-link-exact-active {
      color: $color-primary-dark;
    }
  }
}
</style>
